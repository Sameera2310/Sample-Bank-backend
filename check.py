import keyboard

print("Press any key (Press ESC to exit)...")

while True:
    event = keyboard.read_event()
    if event.event_type == keyboard.KEY_DOWN:
        print(f"Key pressed: {event.name}")

        if event.name == 'esc':
            print("Exiting...")
            break

