const output = document.getElementById("output");

// Show default loading row
output.innerHTML = `
  <tr>
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;

// Function to create a promise with random delay
function createPromise(name) {
  const delay = Math.floor(Math.random() * 3) + 1; // random 1–3 sec
  const startTime = performance.now();

  return new Promise((resolve) => {
    setTimeout(() => {
      const endTime = performance.now();
      const timeTaken = (endTime - startTime) / 1000; // seconds
      resolve({ name, timeTaken });
    }, delay * 1000);
  });
}

// Create 3 promises
const promises = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3"),
];

const allStartTime = performance.now();

Promise.all(promises).then((results) => {
  const allEndTime = performance.now();
  const totalTime = (allEndTime - allStartTime) / 1000;

  // Clear loading row
  output.innerHTML = "";

  // Add promise results
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.timeTaken.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Add total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime.toFixed(3)}</strong></td>
  `;
  output.appendChild(totalRow);
});
