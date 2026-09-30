import mongoose from "mongoose";
import dotenv from "dotenv";
import History from "../src/models/History.model.js";

dotenv.config({ path: ".env" });

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    const histories = await History.find({});
    let updatedCount = 0;

    for (const doc of histories) {
      let changed = false;

      // Update Type
      if (doc.type === "assistant_ask" || doc.type === "explain") {
        doc.type = "ask";
        changed = true;
      } else if (["analyze", "optimize", "debug"].includes(doc.type)) {
        doc.type = "review";
        changed = true;
      }

      // Title & Preview
      if (doc.type === "translate" || doc.targetLanguage) {
        doc.type = "translate";
        doc.title = `${doc.sourceLanguage || "Unknown"} → ${doc.targetLanguage || "Unknown"}`;
        doc.preview = doc.inputCode || "";
        changed = true;
      } else if (doc.type === "ask") {
        doc.title = (doc.prompt || "Ask").substring(0, 60);
        doc.preview = doc.inputCode || doc.prompt || "";
        changed = true;
      } else if (doc.type === "review") {
        let timeComplexity = "Unknown";
        if (doc.output?.complexity?.time) {
          timeComplexity = doc.output.complexity.time;
        }
        doc.title = `Review · ${doc.sourceLanguage || "Unknown"} · ${timeComplexity}`;
        doc.preview = doc.inputCode || "";
        changed = true;
      }

      if (changed) {
        await History.updateOne({ _id: doc._id }, {
          $set: {
            type: doc.type,
            title: doc.title,
            preview: doc.preview
          }
        });
        updatedCount++;
      }
    }

    console.log(`Backfilled ${updatedCount} history records.`);
    process.exit(0);
  } catch (error) {
    console.error("Error backfilling history:", error);
    process.exit(1);
  }
};

run();
