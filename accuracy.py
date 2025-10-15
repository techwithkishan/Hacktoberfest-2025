import time
def speed():
    name = input("Enter your name here: ")
    print("You can type 'done' to end the test.")
    print("All the best!\n")

    sentence = "Hello I'm good"
    print("Type the following sentence exactly as shown:\n➡️", sentence)

    input("\nPress Enter to start...")

    start = time.time()
    while (sen := input("\nEnter the sentence here:\n")) != "done":
        if sentence == sen:
            print("✅ You got it right!")
            break
        else:
            print("❌ Type again...")

    end = time.time()
    timetaken = end - start
    speed_wpm = (len(sentence.split()) / timetaken) * 60

    print(f"\n⌛ Time Taken: {timetaken:.2f} seconds")
    print(f"⚡ Speed: {speed_wpm:.2f} words per minute")

speed()

    