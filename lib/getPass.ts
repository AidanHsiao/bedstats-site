export default function getPass(): string {
  const pass = sessionStorage.getItem("pass") || localStorage.getItem("pass");
  return pass || "";
}
