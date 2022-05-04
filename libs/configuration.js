import axios from "axios";

/**
 * Configuration for axios
 * Σε αυτό το σημείο γίνεται initialize του profile μας για το axios
 *
 * Ορίζεται το baseURL καθώς και οποιαδοίποτε άλλο header ώστε να μην χρειάζεται να κάνουμε
 * καθε φορά import όλες τις παραμέτρους σε κάθε request
 *
 * Για να χρησιμοποιήσουμε το axios  με το profile αρκεί να το κάνουμε import απο αυτό το αρχείο
 */
const backend = axios.create({
  baseURL: "https://localhost:7126",
  headers: { "Content-Type": "application/json" },
})

export { backend };

