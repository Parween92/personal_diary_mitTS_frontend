declare module "*.png" {
  const value: string;
  export default value;
}

//Erlaubt den Import von Bilddateien (z.B. PNG, JPG) als Module in
// TypeScript (z.B. import logo from "./logo.png";).
// Ohne diese Datei gibt es Typfehler bei Bild-Imports.
