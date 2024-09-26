const houseBlueprint = {
    address: '',
    date: new Date(),
    description: '',
    owner: '',
    size: 0,
    _averageBuildSpeed: 0.5,

    getDaysToBuild() {
        return this.size / this._averageBuildSpeed
    }
}

function HouseBuilder(address, description, owner, size, roomCount) {
    const house = Object.create(houseBlueprint)
    house.address = address;
    house.description = description;
    house.owner = owner;
    house.size = size;
    house.roomCount = roomCount;

    return house
}
