<?php

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Excel-style Table up to ZZ</title>
  <style>
    body { font-family: Arial, sans-serif; }
    #table-container { margin-top: 20px; overflow: auto; max-width: 100%; }
    table {
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      width: 50px;
      height: 30px;
      text-align: center;
      cursor: pointer;
    }
    th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
    .corner-cell {
      background-color: #333;
      color: white;
    }
  </style>
</head>
<body>
  <h2>Create a Custom Excel-style Table</h2>
  <form id="table-form">
    <label for="rows">Rows:</label>
    <input type="number" id="rows" name="rows" value="20" min="1" required>
    <label for="cols">Columns (max 702):</label>
    <input type="number" id="cols" name="cols" value="30" min="1" max="702" required>
    <button type="submit">Generate Table</button>
  </form>

  <div id="table-container"></div>

  <script>
    // Convert 0-based column index to Excel-style column name
    function getExcelColumn(n) {
      let name = '';
      while (n >= 0) {
        name = String.fromCharCode(n % 26 + 65) + name;
        n = Math.floor(n / 26) - 1;
      }
      return name;
    }

    document.getElementById('table-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const r = parseInt(document.getElementById('rows').value);
      const c = parseInt(document.getElementById('cols').value);

      if (c > 702) {
        alert("Maximum column limit is 702 (Column ZZ)");
        return;
      }

      const container = document.getElementById("table-container");
      container.innerHTML = ""; // Clear old table

      const table = document.createElement("table");

      for (let i = 0; i <= r; i++) {
        const tr = document.createElement("tr");

        for (let j = 0; j <= c; j++) {
          const cell = i === 0 ? document.createElement("th") : document.createElement("td");

          if (i === 0 && j === 0) {
            cell.className = "corner-cell";
            cell.textContent = "";
          } else if (i === 0) {
            cell.textContent = getExcelColumn(j - 1);
          } else if (j === 0) {
            cell.textContent = i;
          } else {
            cell.addEventListener("click", () => {
              const colName = getExcelColumn(j - 1);
              alert(`${colName}${i}`);
            });
          }

          tr.appendChild(cell);
        }

        table.appendChild(tr);
      }

      container.appendChild(table);
    });
  </script>
</body>
</html>
