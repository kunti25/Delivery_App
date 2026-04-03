 let historyDiv = document.getElementById("history");


  async function getOrders() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/posts");
      let data = await res.json();

      let orders = data.slice(0, 5).map((item, index) => {
        return {
          id: item.id,
          date: "1-04-2026" + (index + 1),
          items: ["Item " + item.id],
          price: 100 + item.id
        };
      });

      showOrders(orders);

    } catch (error) {
      console.log("Error:", error);
    }
  }

  function showOrders(orders) {
    historyDiv.innerHTML = "";

    orders.forEach((order, index) => {
      let div = document.createElement("div");
      div.className = "order";

      div.innerHTML = `
        <p><b>Date:</b> ${order.date}</p>
        <p><b>Items:</b> ${order.items.join(", ")}</p>
        <p><b>Price:</b> ₹${order.price}</p>
        <button class="reorder" onclick="reOrder(${index})">Re-order</button>
        <button class="delete" onclick="deleteOrder(this)">Delete</button>
      `;

      historyDiv.appendChild(div);
    });
  }

  function reOrder(index) {
    alert("Re-order placed!");
    console.log("Re-order index:", index);

    fetch("/api/reorder", {
     method: "POST",
     body: JSON.stringify({ orderId: index })
  })
  }

  function deleteOrder(btn) {
    let confirmDelete = confirm("Are you sure to delete?");
    
    if (confirmDelete) {
      btn.parentElement.remove();
    }
  }
init();   
  getOrders();