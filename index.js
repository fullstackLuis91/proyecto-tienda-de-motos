const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

app.use("/users",require("./routes/users.js"))
app.use("/categories",require("./routes/categories.js"))
app.use("/products",require("./routes/products.js"))
app.use("/orders",require("./routes/orders.js"))



app.listen(PORT, () => console.log("servidor levantado en el puerto" + PORT))