// 🔹 Full list of 25+ supported languages
export const LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
  { id: "c", name: "C" },
  { id: "csharp", name: "C#" },
  { id: "typescript", name: "TypeScript" },
  { id: "go", name: "Go" },
  { id: "rust", name: "Rust" },
  { id: "php", name: "PHP" },
  { id: "ruby", name: "Ruby" },
  { id: "swift", name: "Swift" },
  { id: "kotlin", name: "Kotlin" },
  { id: "dart", name: "Dart" },
  { id: "r", name: "R" },
  { id: "shell", name: "Shell" },
  { id: "sql", name: "SQL" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "json", name: "JSON" },
  { id: "yaml", name: "YAML" },
  { id: "markdown", name: "Markdown" },
  { id: "perl", name: "Perl" },
  { id: "scala", name: "Scala" },
  { id: "haskell", name: "Haskell" },
  { id: "fortran", name: "Fortran" },
  { id: "pascal", name: "Pascal" }
];

// 🔹 Monaco Editor mapping
export const MONACO_LANGUAGE_MAP = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  java: "java",
  cpp: "cpp",
  c: "c",
  csharp: "csharp",
  go: "go",
  rust: "rust",
  php: "php",
  ruby: "ruby",
  swift: "swift",
  kotlin: "kotlin",
  dart: "dart",
  r: "r",
  shell: "shell",
  sql: "sql",
  html: "html",
  css: "css",
  json: "json",
  yaml: "yaml",
  markdown: "markdown",
  perl: "perl",
  scala: "scala",
  haskell: "haskell",
  fortran: "fortran",
  pascal: "pascal"
};

// 🔹 Starter code (shown when language changes)
export const STARTER_CODE = {
  javascript: `console.log("Hello, World!");`,
  python: `print("Hello, World!")`,
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,
  c: `#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}`,
  csharp: `using System;

class Program {
  static void Main() {
    Console.WriteLine("Hello, World!");
  }
}`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  go: `package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
};