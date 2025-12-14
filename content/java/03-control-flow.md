# Topic: Control Flow & Branching

**Difficulty**: BEGINNER
**Estimated Time**: 45 Minutes
**Description**: Master the art of directing program execution. From basic loops to complex branching and Java 17 switch expressions.

---

## 1. 🚦 The "Traffic Control" of Code

Imagine a city without traffic lights. Cars would crash, no one would know when to stop, and chaos would reign.
**Control Flow** is the traffic system of your code. It decides:
1.  **Selection**: Which road to take? (`if`, `switch`)
2.  **Iteration**: How many laps to drive? (`for`, `while`)
3.  **Jumps**: Teleporting to an exit? (`break`, `return`)

In FAANG interviews, 90% of algorithmic problems rely on complex iteration patterns (e.g., Sliding Window, Two Pointers). Mastering efficient looping is non-negotiable.

---

## 2. 🧠 Internals: How Branching Works

When you write an `if` statement, the JVM bytecode uses instructions like `ifeq` (if equal) or `goto`.
Deep down, it's all about **Jumps**.

### The Stack Frame View
Variables declared *inside* a loop or block are created and destroyed (popped) repeatedly.
```java
for (int i = 0; i < 1000; i++) {
    int temp = i * 2; // 'temp' is created on the stack 1000 times?
    // Effectively, yes. But the compiler optimizes this slot reuse.
}
```

---

## 3. 🕸️ Loops & Iteration Strategies

### 3.1 The "Classic" For-Loop
Best when you know the **exact count**.

```java
//    Init      Condition    Update
for (int i = 0; i < n; i++) {
    // Body
}
```

### 3.2 The "Enhanced" For-Each
Use this for **Read-Only** access to collections. You *cannot* modify the structure (add/remove) safely without an Iterator.

```java
int[] nums = {1, 2, 3};
for (int n : nums) {
    System.out.println(n);
}
```

### 3.3 While vs. Do-While
*   `while`: Checks **before** entry. (Maybe 0 runs)
*   `do-while`: Checks **after** execution. (Always at least 1 run)

---

## 4. 🔀 Advanced Branching: The Modern Switch

Java 12+ introduced **Switch Expressions**. No more missing `break` bugs!

### Old School (Fall-through risk) 💀
```java
switch (day) {
    case MON: 
        System.out.println("Work");
        // Oops, forgot break!
    case TUE:
        System.out.println("Work more");
}
```

### Modern Arrow Syntax (Safe & Clean) ✨
```java
String mood = switch (day) {
    case MON, TUE, WED -> "Work Mode";
    case SAT, SUN      -> "Party Mode";
    default            -> "Sleep";
};
```

---

## 5. 🏃‍♂️ Break, Continue & Labels

*   `break`: Eject immediately from the nearest loop.
*   `continue`: Skip the rest of this lap, go to next iteration.
*   **Labels**: The nuclear option. Eject from *nested* loops.

```java
outerLoop:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j > 10) {
            break outerLoop; // Breaks BOTH loops
        }
    }
}
```

---

## 6. ⚔️ Zero-to-Hero: Coding Challenges

### Basic Drills

**Q1: The Counter**
Write a loop that prints numbers from 10 down to 1.
```java
// Hidden solution block for Q1 (Counter)
public class Solution {
    public void printCountdown() {
        for (int i = 10; i >= 1; i--) {
            System.out.print(i + " ");
        }
    }
}
```
```python
# Hidden solution block for Q1
def print_countdown():
    for i in range(10, 0, -1):
        print(i, end=" ")
```

**Q2: Sum of Evens**
Calculate the sum of all even numbers between 1 and 100.
```java
// Hidden solution block for Q2 (Sum Evens)
public class Solution {
    public int sumEvens() {
        int sum = 0;
        for (int i = 2; i <= 100; i += 2) {
            sum += i;
        }
        return sum;
    }
}
```
```python
# Hidden solution for Q2
def sum_evens():
    return sum(range(2, 101, 2))
```

### FAANG Interview Warmups

**Q3: Reversing a Number (Mathematical)**
**Companies**: Amazon, Microsoft
Given an integer `x`, return it with its digits reversed.
*Example*: `x = 123` -> `321`. `x = -123` -> `-321`.
*Hint*: Use modulo `% 10` to strip the last digit.
```java
// Hidden solution for Q3 (Reverse Integer)
public class Solution {
    public int reverse(int x) {
        long reversed = 0; // Use long to catch overflow
        while (x != 0) {
            int digit = x % 10;
            reversed = reversed * 10 + digit;
            x /= 10;
        }
        if (reversed > Integer.MAX_VALUE || reversed < Integer.MIN_VALUE) {
            return 0; // Overflow case
        }
        return (int) reversed;
    }
}
```
```python
# Hidden solution for Q3
def reverse(x: int) -> int:
    sign = -1 if x < 0 else 1
    x = abs(x)
    reversed_x = 0
    while x != 0:
        reversed_x = reversed_x * 10 + x % 10
        x //= 10
    
    result = sign * reversed_x
    # Handle 32-bit overflow
    if result > 2**31 - 1 or result < -2**31:
        return 0
    return result
```

**Q4: Palindrome Integer**
**Companies**: Google, Facebook
Determine if an integer is a palindrome (reads the same backward). Do this *without* converting to a string.
```java
// Hidden solution for Q4 (Palindrome)
public class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) return false; // Negatives represent -121 != 121-
        int original = x;
        int reversed = 0;
        while (x != 0) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }
        return original == reversed;
    }
}
```
```python
# Hidden solution for Q4
def is_palindrome(x: int) -> bool:
    if x < 0:
        return False
    original = x
    reversed_x = 0
    while x > 0:
        reversed_x = reversed_x * 10 + x % 10
        x //= 10
    return original == reversed_x
```

**Q5: The "FizzBuzz" Test (Classic)**
**Companies**: All (Sanity check)
Print 1 to n.
- If div by 3 -> "Fizz"
- If div by 5 -> "Buzz"
- If div by both -> "FizzBuzz"
```java
// Hidden solution for Q5 (FizzBuzz)
public class Solution {
    public void fizzBuzz(int n) {
        for (int i = 1; i <= n; i++) {
             if (i % 3 == 0 && i % 5 == 0) System.out.println("FizzBuzz");
             else if (i % 3 == 0) System.out.println("Fizz");
             else if (i % 5 == 0) System.out.println("Buzz");
             else System.out.println(i);
        }
    }
}
```
```python
# Hidden solution for Q5
def fizz_buzz(n: int):
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)
```

---

## 7. 🚀 Edge Cases & Pitfalls

1.  **Infinite Loops**: Forgetting `i++`.
2.  **Off-by-One**: `i <= n` vs `i < n`.
3.  **Floating Point Loops**: Never use `float`/`double` for loop counters (precision errors).
    ```java
    // DANGEROUS
    for (double d = 0.0; d != 1.0; d += 0.1) { ... } // Might never stop!
    ```
