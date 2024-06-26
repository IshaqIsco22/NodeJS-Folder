function placeOrder(drink) {
  return new Promise(function (resolve, reject) {
    if (drink === "coffee") {
      resolve("Order received");
    } else {
      reject("Order not received");
    }
  });
}

function processOrder(order) {
  return new Promise(function (resolve) {
    console.log("order is being processed");
    resolve(`${order} is served`);
  });
}

// placeOrder("coffee")
//   .then(function (orderPlaced) {
//     console.log(orderPlaced);
//     let orderIsProcessed = processOrder(orderPlaced);
//     return orderIsProcessed;
//   })
//   .then(function (processedOrder) {
//     console.log(processedOrder);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

async function serveOrder() {
  try {
    let orderPlaced = await placeOrder("tea");
    console.log(orderPlaced);
    let processedOrder = await processOrder(orderPlaced);
    console.log(processedOrder);
  } catch (err) {
    console.log(err);
  }
}

serveOrder();
