import argparse

MENU = {
    "pizza": {
        "price": 12.0,
        "sizes": ["small", "medium", "large"]
    },
    "salad": {
        "price": 8.0,
        "sizes": ["regular", "large"]
    },
    "water": {
        "price": 2.0,
        "sizes": ["bottle"]
    }
}

class VoiceAgent:
    def __init__(self, menu):
        self.menu = menu
        self.order = []

    def start_call(self, call_type: str = "inbound"):
        if call_type == "outbound":
            print("Placing an outbound call...")
        else:
            print("Incoming call answered...")
        print("Hello! Welcome to our restaurant.")
        self.present_menu()
        self.take_order()
        self.summarize_order()

    def present_menu(self):
        print("Our menu items:")
        for item, info in self.menu.items():
            print(f"- {item} (${info['price']}) sizes: {', '.join(info['sizes'])}")

    def take_order(self):
        while True:
            item = input("Enter item name (or 'done' to finish): ").strip().lower()
            if item == 'done':
                break
            if item not in self.menu:
                print("Item not found. Try again.")
                continue
            size = input(f"Enter size for {item}: ").strip().lower()
            if size not in self.menu[item]['sizes']:
                print("Invalid size. Try again.")
                continue
            qty = input("Quantity: ").strip()
            if not qty.isdigit() or int(qty) <= 0:
                print("Invalid quantity. Try again.")
                continue
            self.order.append({"item": item, "size": size, "qty": int(qty)})
            print(f"Added {qty} {size} {item}(s).")

    def summarize_order(self):
        total = 0
        print("\nOrder summary:")
        for entry in self.order:
            price = self.menu[entry['item']]['price'] * entry['qty']
            total += price
            print(f"{entry['qty']} x {entry['size']} {entry['item']} - ${price:.2f}")
        print(f"Total: ${total:.2f}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Simulate a restaurant voice agent")
    parser.add_argument("call_type", nargs="?", default="inbound", choices=["inbound", "outbound"], help="Type of call to simulate")
    args = parser.parse_args()

    agent = VoiceAgent(MENU)
    print("Welcome to the Restaurant Voice Agent Simulator!")
    agent.start_call(args.call_type)
