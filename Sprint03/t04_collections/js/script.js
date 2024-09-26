// guestList
console.log('Guest List')
const guestList = new WeakSet()

const Dmitriy = {name: 'Dmitriy'}
const Ivan = {name: 'Ivan'}
const Alexandr = {name: 'Alexandr'}
const Andrey = {name: 'Andrey'}
const Vitaliy = {name: 'Vitaliy'}

guestList.add(Dmitriy)
guestList.add(Alexandr)
guestList.add(Andrey)
guestList.add(Vitaliy)

console.log(`Does guestList has Alexandr: ${guestList.has(Alexandr)}`)
console.log(`Does guestList has Ivan: ${guestList.has(Ivan)}`)
console.log('Added Ivan')
guestList.add(Ivan)
console.log(`Does guestList has Ivan: ${guestList.has(Ivan)}`)
console.log(`Does guestList has Andrey: ${guestList.has(Andrey)}`)
console.log('Delete Andrey')
guestList.delete(Andrey)
console.log(`Does guestList has Andrey: ${guestList.has(Andrey)}`)

// menu
console.log('\nMenu')
const menu = new Map()

menu.set('Pizza', 10)
menu.set('Burger', 5)
menu.set('Pasta', 12)
menu.set('Stake', 20)
menu.set('Soup', 8)
console.log(`Find existing element(Pizza): ${menu.get('Pizza')}`)
console.log(`Find non-existing element(Cheeseburger): ${menu.get('Cheeseburger')}`)
console.log(`Menu size is: ${menu.size}`)
console.log('Iterate over it:')
for (let [key, value] of menu) {
    console.log(key + ' costs ' + value)
}
console.log(`Removed pasta:`)
menu.delete('Pasta')
console.log('Iterate over it:')
for (let [key, value] of menu) {
    console.log(key + ' costs ' + value)
}
console.log('Cleared the collection!')
menu.clear()
console.log('Iterate over it:')
for (let [key, value] of menu) {
    console.log(key + ' costs ' + value)
}

// bankVault
console.log('\nBank Vault')
const bankVault = new WeakMap()

const creds1 = { id: 12345 };
const creds2 = { id: 67890 };
const creds3 = { id: 68472 };
const creds4 = { id: 12387 };
const creds5 = { id: 67680 };

bankVault.set(creds1, "Diamonds");
bankVault.set(creds2, "Gold");
bankVault.set(creds3, "Dollars");
bankVault.set(creds4, "Euros");
bankVault.set(creds5, "Bitcoins");

console.log(`Has gold: ${bankVault.has(creds2)}`)
console.log('Deleted gold')
bankVault.delete(creds2)
console.log(`Has gold: ${bankVault.has(creds2)}`)
console.log(`Get diamonds: ${bankVault.get(creds1)}`)

// coin collection
console.log('\nCoin Collection')
const coins = new Set()

coins.add('coin1')
coins.add('coin2')
coins.add('coin3')
coins.add('coin4')
coins.add('coin5')

console.log(`Amount of coins: ${coins.size}`)
coins.forEach(coin => console.log(coin))
console.log('deleted coin 4')
coins.delete('coin4')
console.log(`Has coin4: ${coins.has('coin4')}`)
console.log(`Has coin3: ${coins.has('coin3')}`)
console.log('clear collection')
coins.clear()
console.log(`Amount of coins: ${coins.size}`)
