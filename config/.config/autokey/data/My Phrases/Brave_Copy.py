import time

# Trigger ONLY in Brave
app = window.get_active_class()

if "Brave-browser" not in app:
    # Do nothing in other apps
    keyboard.send_keys("<ctrl>+<shift>+c")
    # Explanation: passing through the original keys
else:
    time.sleep(0.05)
    keyboard.send_keys("<ctrl>+c")
