const fs = require('fs')
const path = require('path')
const cartsPath = path.join(__dirname, '../Data/carts.json')
const usersPath = path.join(__dirname, '../Data/users.json')
const productsPath = path.join(__dirname, '../Data/product.json')

// Fungsi untuk membaca JSON
function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath))
}
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// Add to cart
exports.addToCart = (req, res) => {
  const username = req.params.username
  const { productId, qty } = req.body

  const users = readJSON(usersPath)
  const products = readJSON(productsPath)
  let carts = readJSON(cartsPath)

  // Validasi user
  const user = users.find(u => u.username === username)
  if (!user) {
    return res.status(404).json({ message: 'User tidak ditemukan' })
  }

  // Validasi produk
  const product = products.find(p => p.id === productId)
  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' })
  }

  // Cari cart user
  let cartUser = carts.find(c => c.username === username)
  if (!cartUser) {
    cartUser = { username, items: [] }
    carts.push(cartUser)
  }

  // Tambah / Update qty
  const item = cartUser.items.find(i => i.productId === productId)
  if (item) {
    item.qty += qty || 1
  } else {
    cartUser.items.push({ productId, qty: qty || 1 })
  }

  writeJSON(cartsPath, carts)
  res.json({ message: 'Produk ditambahkan', cart: cartUser })

}

// Delete produk dari cart
exports.removeFromCart = (req, res) => {
  const username = req.params.username
  const { productId } = req.body
  let carts = readJSON(cartsPath)

  const cartUser = carts.find(c => c.username === username)
  if (!cartUser) return res.status(404).json({ message: 'Cart tidak ada' })

  cartUser.items = cartUser.items.filter(i => i.productId !== productId)
  writeJSON(cartsPath, carts)
  res.json({ message: 'Produk dihapus', cart: cartUser })
}

// Get cart by username
exports.getCart = (req, res) => {
  const username = req.params.username
  const users = readJSON(usersPath)
  const products = readJSON(productsPath)
  const carts = readJSON(cartsPath)

  const user = users.find(u => u.username === username)
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan' })

  const cartUser = carts.find(c => c.username === username)
  if (!cartUser) return res.json({ user, items: [] })

  // gabungkan info produk
  const detailedItems = cartUser.items.map(i => {
    const p = products.find(prod => prod.id === i.productId)
    return {
      productId: i.productId,
      productName: p?.productName,
      price: p?.price,
      qty: i.qty
    }
  })

  res.json({ user, items: detailedItems })
}
