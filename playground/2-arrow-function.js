const event = {
    name: "Swara's wedding",
    guestList: ['kiran', 'Shraddha', 'Swara', 'Sulabha'],
    printGuestList() {
        console.log("Guest list for", this.name);
        this.guestList.forEach((guest) => {
            console.log(guest, " is atending", this.name);
        })
    }
}

event.printGuestList();