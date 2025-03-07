export const tests = [
    {
        id: "pre-test-1",
        title: "Pre-Test Control Structures",
        questions: [
            {
                id: 1,
                question: "What will the following code output?",
                code: `int count = 0;
      while (count < 3) {
          System.out.println("Java Programming");
          count++;
      }`,
                options: [
                    "Java Programming",
                    "Java Programming\nJava Programming\nJava Programming",
                    "Java Programming\nJava Programming",
                    "Nothing"
                ],
                answer: "Java Programming\nJava Programming\nJava Programming"
            },
            {
                id: 2,
                question: "What will happen if the loop-continuation-condition in the following code is never false?",
                code: `int i = 1;
      while (i > 0) {
          System.out.println("Infinite loop!");
      }`,
                options: [
                    "The loop will execute exactly once and then terminate.",
                    "The program will enter an infinite loop because i > 0 is always true.",
                    "The loop will terminate immediately since the condition is false.",
                    "The program will throw a syntax error."
                ],
                answer: "The program will enter an infinite loop because i > 0 is always true."
            },
            {
                id: 3,
                question: "What is the role of the loop-continuation-condition in a while loop?",
                options: [
                    "It defines the statements that are executed repeatedly in the loop body.",
                    "It initializes the variables used in the loop body.",
                    "It is a Boolean expression that determines whether the loop should continue or terminate.",
                    "It ensures that the loop runs a specific number of times."
                ],
                answer: "It is a Boolean expression that determines whether the loop should continue or terminate."
            },
            {
                id: 4,
                question: "Write a Java program that prints 'Hello, World!' on the screen. Fill in the missing parts to complete the program.",
                code: `public class HelloWorld {
          public static void main(String[] args) {
              ___.___.___("Hello, World!");
          }
      }`,
                options: [
                    "System.out('Hello, World!');",
                    "System.println('Hello, World!');",
                    "System.out.println('Hello, World!');",
                    "System.print.out('Hello, World!');"
                ],
                answer: "System.out.println('Hello, World!');"
            }
        ]

    },

    {
        id: "post-test-1",
        title: "Post-Test Control Structures",
        questions: [
            {
                id: 1,
                question: "What will the following code output?",
                code: `int count = 1;
    while (count <= 3) {
        System.out.println(5);
        count++;
    }`,
                options: [
                    "5\n5\n5",
                    "3\n3\n3",
                    "5\n4\n3",
                    "3"
                ],
                answer: "5\n5\n5"
            },
            {
                id: 2,
                question: "What will happen if the loop-continuation-condition in the following code is always true?",
                code: `int i = 0;
    while (i < 10) {
        System.out.println("Infinite loop!");
    }`,
                options: [
                    "The loop will execute exactly 10 times and then terminate.",
                    "The program will enter an infinite loop because i is not updated within the loop body.",
                    "The loop will terminate immediately since the condition is false.",
                    "The program will throw a syntax error."
                ],
                answer: "The program will enter an infinite loop because i is not updated within the loop body."
            },
            {
                id: 3,
                question: "Which of the following best describes an iteration in a loop?",
                options: [
                    "It is the evaluation of the loop-continuation-condition to determine if the loop should terminate.",
                    "It refers to the process of preventing an infinite loop.",
                    "It is a single complete execution of the loop body.",
                    "It is the initialization of the loop control variable before the loop begins."
                ],
                answer: "It is a single complete execution of the loop body."
            },
            {
                id: 4,
                question: "Write a Java program that calculates and prints the sum of two numbers. Fill in the missing parts to complete the program.",
                code: `public class CalculateSum {
    public static void main(String[] args) {
        int num1 = 10;
        int num2 = 20;
        int sum = num1 + num2;
        ___.___.----(___);
    }
}
`,
                options: [
                    "System.out(sum);",
                    "System.println(sum);",
                    "System.out.println(sum);",
                    "System.print.out(sum);"
                ],
                answer: "System.out.println(sum);"
            }
        ]
    },
    {
        id: "pre-test-2",
        title: "Pre-Test Loops",
        questions: [
            {
                id: 1,
                question: "Why does the following loop not terminate, even when the user guesses the correct number?",
                code: `int number = (int)(Math.random() * 101);
    Scanner input = new Scanner(System.in);
    int guess = -1;
    
    while (true) {
        System.out.print("Enter your guess: ");
        guess = input.nextInt();
    
        if (guess == number)
            System.out.println("Correct!");
        else if (guess > number)
            System.out.println("Too high!");
        else
            System.out.println("Too low!");
    }`,
                options: [
                    "The loop condition should be while (guess != number).",
                    "The random number is not generated correctly.",
                    "The input is not being read correctly.",
                    "The program works as intended."
                ],
                answer: "The loop condition should be while (guess != number)."
            },
            {
                id: 2,
                question: " What is a sentinel value in the context of loops?",
                options: [
                    "A variable used to count the number of iterations in a loop.",
                    "A special value that controls the termination of a loop.",
                    "A random number used to control the loop execution.",
                    "A value used to initialize variables inside the loop."
                ],
                answer: "A special value that controls the termination of a loop."
            },
            {
                id: 3,
                question: "What is the key difference between a while loop and a do-while loop?",
                options: [
                    "A while loop executes the body first, then checks the condition.",
                    "A do-while loop executes the body first, then checks the condition.",
                    "Both loops always execute at least once.",
                    "A do-while loop cannot use a Boolean condition."
                ],
                answer: "A do-while loop executes the body first, then checks the condition."
            },
            {
                id: 4,
                question: "When is it more appropriate to use a do-while loop instead of a while loop?",
                options: [
                    "When the condition must be checked before the loop body executes.",
                    "When the loop body must execute at least once, regardless of the condition.",
                    "When the loop should terminate immediately without executing the body.",
                    "When there is no need for a loop continuation condition."
                ],
                answer: "When the loop body must execute at least once, regardless of the condition."
            },
            {
                id: 5,
                question: "What will the following code output if the user enters 2, 3, and 0?",
                code: `int sum = 0;
int data;
Scanner input = new Scanner(System.in);

do {
    System.out.print("Enter an integer (0 to stop): ");
    data = input.nextInt();
    sum += data;
} while (data != 0);

System.out.println("The sum is " + sum);
`,
                options: [
                    "The sum is 0",
                    "The sum is 2",
                    "The sum is 5",
                    "The sum is 3"
                ],
                answer: "The sum is 5"
            },
            {
                id: 6,
                question: "Convert the following while loop into a do-while loop:",
                code: `int number = 0;
Scanner input = new Scanner(System.in);
System.out.print("Enter a number (0 to stop): ");
number = input.nextInt();

while (number != 0) {
    System.out.println("You entered: " + number);
    System.out.print("Enter a number (0 to stop): ");
    number = input.nextInt();
}
`,
                options: [
                    "Place the input statement outside the loop.",
                    "Place the input statement inside the do block before the condition.",
                    "Use while (true) for the condition.",
                    "Use do-while syntax but leave the input statement outside."
                ],
                answer: "Place the input statement inside the do block before the condition."
            },
            {
                id: 7,
                question: "What are the three main parts of a for loop control structure?",
                options: [
                    "Initialization, condition, and loop variable declaration.",
                    "Loop body, loop termination, and variable increment.",
                    "Initialization, loop-continuation-condition, and action-after-each-iteration.",
                    "Initialization, loop-continuation-condition, and loop termination."
                ],
                answer: "Initialization, loop-continuation-condition, and action-after-each-iteration."
            },
            {
                id: 8,
                question: "Which of the following correctly describes the flow of a for loop?",
                options: [
                    "The loop-continuation-condition is checked after the loop body is executed.",
                    "The action-after-each-iteration is executed before the loop-continuation-condition.",
                    "The loop body must always execute at least once, regardless of the condition.",
                    "The initial action is executed once, then the loop-continuation-condition is checked before each iteration."
                ],
                answer: "The initial action is executed once, then the loop-continuation-condition is checked before each iteration."
            },
            {
                id: 9,
                question: "Rewrite the following for loop as a while loop:",
                code: `for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}
`,
                options: [
                    `int i = 1;
while (i < 10) {
    System.out.println(i);
    i++;
}
`,
                    `int i = 1;
while (i <= 10) {
    System.out.println(i);
    i++;
}
`,
                    `int i = 10;
while (i > 1) {
    System.out.println(i);
    i++;
}
`,
                    `int i = 0;
while (i <= 10) {
    System.out.println(i);
    i--;
}
`
                ],
                answer: `int i = 1;
while (i <= 10) {
    System.out.println(i);
    i++;
}
`
            },
            {
                id: 10,
                question: "Which of the following is true about the differences between while, do-while, and for loops?",
                options: [
                    "A while loop always executes at least once.",
                    "A do-while loop checks the condition before executing the loop body.",
                    "A for loop is most suitable when the number of iterations is known in advance.",
                    "All three loops are equivalent and interchangeable without conditions."
                ],
                answer: "A for loop is most suitable when the number of iterations is known in advance."
            },
            {
                id: 11,
                question: "What common mistake can cause a for or while loop to have an empty body?",
                options: [
                    "Omitting the condition in the loop control structure.",
                    "Adding a semicolon immediately after the loop declaration.",
                    "Declaring a variable inside the loop body.",
                    "Using a do-while loop instead of a while loop."
                ],
                answer: "Adding a semicolon immediately after the loop declaration."
            },
            {
                id: 12,
                question: "What is the main difference between the break and continue statements in loops?",
                options: [
                    "break exits the current iteration, and continue ends the loop.",
                    "continue breaks out of an iteration while the break keyword breaks out of a loop",
                    "break exits the next iteration, and continue ends the current loop.",
                    "Both break and continue skip to the next iteration."
                ],
                answer: "continue breaks out of an iteration while the break keyword breaks out of a loop"
            },
            {
                id: 13,
                question: "Why can overusing break and continue statements make a program difficult to read?",
                options: [
                    "They increase the number of nested loops.",
                    "They add multiple exit points to the loop.",
                    "They require more memory to execute.",
                    "They cannot be used in combination with if statements."
                ],
                answer: "They add multiple exit points to the loop."
            },
            {
                id: 14,
                question: "What will be the output of the following code?",
                code: `int sum = 0;
for (int i = 1; i <= 5; i++) {
    if (i == 3) break;
    sum += i;
}
System.out.println(sum);
`,
                options: [
                    "6",
                    "15",
                    "3",
                    "10"
                ],
                answer: "6"
            },
            {
                id: 15,
                question: "What happens when the following code runs?",
                code: `int i = 0;
while (i < 5) {
    if (i % 2 == 0) continue;
    i++;
    System.out.println(i);
}
`,
                options: [
                    "It will terminate normally.",
                    "It will create an infinite loop.",
                    "It will print all numbers from 1 to 5.",
                    "It will skip even numbers but terminate."
                ],
                answer: "It will create an infinite loop."
            },

        ]
    },

    {
        id: "post-test-2",
        title: "Post-Test Loops",
        questions: [
            {
                id: 1,
                question: "Why does the following code cause an infinite loop even after the correct number is guessed?",
                code: `int number = (int)(Math.random() * 101);
    Scanner input = new Scanner(System.in);
    
    while (number != -1) {
        System.out.print("Enter your guess: ");
        int guess = input.nextInt();
    
        if (guess == number)
            System.out.println("Correct!");
        else if (guess > number)
            System.out.println("Too high!");
        else
            System.out.println("Too low!");
    }`,
                options: [
                    "The loop condition should be while (guess != number).",
                    "The variable number is being compared incorrectly in the loop condition.",
                    "The program does not generate a random number.",
                    "The program works as intended."
                ],
                answer: "The loop condition should be while (guess != number)."
            },
            {
                id: 2,
                question: "Why is it not recommended to use floating-point values for equality checking in a loop control?",
                options: [
                    "Because floating-point values are always rounded to the nearest integer.",
                    "Because floating-point values can result in imprecise calculations, causing unexpected behavior in the loop.",
                    "Because floating-point values can never be used in loops.",
                    "Because floating-point values automatically terminate loops after a set number of iterations."
                ],
                answer: "Because floating-point values can result in imprecise calculations, causing unexpected behavior in the loop."
            },
            {
                id: 3,
                question: "Why does a do-while loop execute its body at least once?",
                options: [
                    "Because the condition is always true.",
                    "Because the condition is checked after the loop body is executed.",
                    "Because the loop does not require a condition to execute.",
                    "Because it uses a sentinel value."
                ],
                answer: "Because the condition is checked after the loop body is executed."
            },
            {
                id: 4,
                question: "How does the execution flow of a do-while loop differ from a while loop?",
                options: [
                    "A do-while loop skips the body if the condition is false initially.",
                    "A while loop executes the body at least once.",
                    "A do-while loop executes the body first, then checks the condition.",
                    "Both have identical execution flows."
                ],
                answer: "A do-while loop executes the body first, then checks the condition."
            },
            {
                id: 5,
                question: "What will the following code output if the user enters 5, 7, 2, and then 0?",
                code: `int number, max;
Scanner input = new Scanner(System.in);
number = input.nextInt();
max = number;

do {
    number = input.nextInt();
    if (number > max)
        max = number;
} while (number != 0);

System.out.println("max is " + max);
`,
                options: [
                    "max is 5",
                    "max is 7",
                    "max is 2",
                    "max is 0"
                ],
                answer: "max is 7"
            },
            {
                id: 6,
                question: "Rewrite the following code using a do-while loop:",
                code: `int data = -1;
int sum = 0;
while (data != 0) {
    System.out.print("Enter an integer (0 to stop): ");
    data = input.nextInt();
    sum += data;
}
System.out.println("The sum is " + sum);
`,
                options: [
                    "Add the input statement inside the do block.",
                    "Add the sum calculation after the condition.",
                    "Use do syntax and place the input and sum calculation inside the block.",
                    "Use the do syntax but add the condition check outside."
                ],
                answer: "Use do syntax and place the input and sum calculation inside the block."
            },
            {
                id: 7,
                question: "What happens if the loop-continuation-condition in a for loop is omitted?",
                options: [
                    "The loop will throw an error at runtime.",
                    "The loop will execute once and terminate.",
                    "The loop will execute as an infinite loop.",
                    "The loop will be skipped entirely."
                ],
                answer: "The loop will execute as an infinite loop."
            },
            {
                id: 8,
                question: "If a variable is declared in the control structure of a for loop, what happens to the variable after the loop terminates?",
                options: [
                    "It retains its value and can be used outside the loop.",
                    "It is reset to its initial value.",
                    "It is no longer accessible outside the loop",
                    "It causes a compilation error if referenced outside the loop.."
                ],
                answer: "It is no longer accessible outside the loop"
            },
            {
                id: 9,
                question: "Convert the following for loop into a do-while loop:",
                code: `
                for (int i = 5; i > 0; i--) {
    System.out.println("Countdown: " + i);
}
`,
                options: [
                    `int i = 5;
do {
    System.out.println("Countdown: " + i);
    i--;
} while (i > 0);
`,
                    `int i = 5;
do {
    System.out.println("Countdown: " + i);
    i++;
} while (i < 5);
`,
                    `int i = 0;
do {
    System.out.println("Countdown: " + i);
    i++;
} while (i < 0);
`,
                    `int i = 5;
do {
    i--;
    System.out.println("Countdown: " + i);
} while (i >= 0);
`
                ],
                answer: `int i = 5;
do {
    System.out.println("Countdown: " + i);
    i--;
} while (i > 0);
`
            },
            {
                id: 10,
                question: "What is the key difference between a pretest loop and a posttest loop?",
                options: [
                    "A pretest loop executes the loop body at least once, while a posttest loop may not execute the loop body at all.",
                    "A pretest loop checks the condition before the loop body executes, while a posttest loop checks it after.",
                    "A pretest loop always has an empty body, while a posttest loop does not.",
                    "There is no difference; they are the same."
                ],
                answer: "A pretest loop checks the condition before the loop body executes, while a posttest loop checks it after."
            },
            {
                id: 11,
                question: "Why might you choose a do-while loop instead of a while loop?",
                options: [
                    "When the number of iterations is known in advance.",
                    "When the loop body must execute at least once before the condition is checked.",
                    "When the loop must have an empty body for simplicity.",
                    "When you want to avoid using a loop-continuation-condition."
                ],
                answer: "When the loop body must execute at least once before the condition is checked."
            },
            {
                id: 12,
                question: "When is it appropriate to use the break statement in a loop?",
                options: [
                    "To optimize memory usage in a loop.",
                    "To exit the loop when a specific condition is met.",
                    "To skip the current iteration of the loop.",
                    "To jump to a specific point in the program."
                ],
                answer: "To exit the loop when a specific condition is met."
            },
            {
                id: 13,
                question: "What is the impact of having too many break and continue statements in a loop?",
                options: [
                    "It improves the program's readability.",
                    "It reduces the loop's complexity.",
                    "It creates multiple exit points, making the code harder to follow.",
                    "It leads to syntax errors in the program."
                ],
                answer: "It creates multiple exit points, making the code harder to follow."
            },
            {
                id: 14,
                question: "What is the output of the following code if n = 15?",
                code: `int factor = 2;
while (factor <= n) {
    if (n % factor == 0) break;
    factor++;
}
System.out.println(factor);
`,
                options: [
                    "3",
                    "5",
                    "15",
                    "2"
                ],
                answer: "3"
            },
            {
                id: 15,
                question: "What is the corrected version of the following code to avoid an infinite loop?",
                code: `int i = 0;
while (i < 5) {
    if (i % 2 == 0) continue;
    i++;
    System.out.println(i);
}
`,
                options: [
                    "Move i++ inside the if block.",
                    "Remove the continue statement.",
                    "Add i++ before the if block.",
                    "Replace while with for."
                ],
                answer: "Add i++ before the if block."
            },
        ]
    },

    {
        id: "pre-test-3",
        title: "Pre Test Methods",
        questions: [
            {
                id: 1,
                question: "What is the main purpose of using methods in programming?",
                options: [
                    "To minimize memory usage",
                    "To organize and reuse code efficiently",
                    "To speed up program execution",
                    "To avoid using loops"
                ],
                answer: "To organize and reuse code efficiently"
            },
            {
                id: 2,
                question: "What is a method parameter?",
                options: [
                    "A variable that stores the method's return value",
                    "A placeholder that accepts values when the method is invoked",
                    "A keyword that identifies the method's name",
                    "A type of loop used inside methods"
                ],
                answer: "A placeholder that accepts values when the method is invoked"
            },
            {
                id: 3,
                question: "What is the purpose of the return statement in a value-returning method?",
                options: [
                    "To end the loop inside the method",
                    "To define the method's parameters",
                    "To specify the method's return value to the caller",
                    "To print the method's output"
                ],
                answer: "To specify the method's return value to the caller"
            },
            {
                id: 4,
                question: "What happens when a value-returning method is called?",
                options: [
                    "The program stops execution until the method finishes.",
                    "The program control transfers to the method, and the returned value can be used like a variable.",
                    "The program skips the method call if it returns void.",
                    "The method must always print its result directly."
                ],
                answer: "The program control transfers to the method, and the returned value can be used like a variable."
            },
            {
                id: 5,
                question: "Which of the following statements about the System.out.println() method is correct?",
                options: [
                    "It is a value-returning method.",
                    "It cannot be called with parameters.",
                    "It returns the string passed to it.",
                    "It is a void method and must be called as a statement."
                ],
                answer: "It is a void method and must be called as a statement."
            },
            {
                id: 6,
                question: "What is the main difference between a void method and a value-returning method in Java?",
                options: [
                    "A void method must return a value, while a value-returning method does not.",
                    "A void method does not return a value, while a value-returning method must return a value.",
                    "A void method can be called as a value, while a value-returning method cannot.",
                    "A void method must always use a return statement."
                ],
                answer: "A void method does not return a value, while a value-returning method must return a value."
            },
            {
                id: 7,
                question: "In the provided printGrade method, how can you terminate the method early when the score is invalid?",
                code: `public static void printGrade(int score) {
   if (score < 0 || score > 100) {
       System.out.println("Invalid score.");
       ……………………………………
   }
  
   if (score >= 90) {
       System.out.println("A");
   } else if (score >= 80) {
       System.out.println("B");
   } else if (score >= 70) {
       System.out.println("C");
   } else if (score >= 60) {
       System.out.println("D");
   } else {
       System.out.println("F");
   }
}
`,
                options: [
                    "By not including a return statement.",
                    "By adding an extra else condition for invalid scores.",
                    "By using the statement return; after checking for an invalid score.",
                    "By throwing an exception for invalid scores."
                ],
                answer: "By using the statement return; after checking for an invalid score."
            },
            {
                id: 8,
                question: "What does `pass-by-value` mean in Java?",
                options: [
                    "Arguments are passed as references to the method.",
                    "The values of parameters are swapped after the method call.",
                    "The original variables are directly modified by the method.",
                    "Arguments are passed as copies of their values to the method parameters."
                ],
                answer: "Arguments are passed as copies of their values to the method parameters."
            },
            {
                id: 9,
                question: "When invoking a method, which of the following must match between arguments and parameters?",
                options: [
                    "Their names",
                    "Their data types, number, and order",
                    "Their memory locations",
                    "Their accessibility (public or private)"
                ],
                answer: "Their data types, number, and order"
            },
            {
                id: 10,
                question: "Consider the method nPrintln(String message, int n) from the text. What will happen if you call the method like this: nPrintln(3, `Hello`);",
                options: [
                    "The method prints `Hello` three times.",
                    "The method prints an error message.",
                    "A compilation error occurs because the argument order does not match the parameter order.",
                    "The method swaps the arguments and executes normally."
                ],
                answer: "A compilation error occurs because the argument order does not match the parameter order."
            },
            {
                id: 11,
                question: "Why is modularizing code beneficial in programming?",
                options: [
                    "It simplifies code maintenance and debugging while enabling code reuse.",
                    "It removes the need for methods and makes the program faster.",
                    "It prevents the use of redundant variables in the program.",
                    "It increases the complexity of the program to improve functionality."
                ],
                answer: "It simplifies code maintenance and debugging while enabling code reuse."
            },
            {
                id: 12,
                question: "What is the scope of a local variable in Java?",
                options: [
                    "From the start of the method to the end of the program.",
                    "From its declaration to the end of the block that contains it.",
                    "From the start of the class to the end of the program.",
                    "From the method header to the method return statement."
                ],
                answer: "From its declaration to the end of the block that contains it."
            },
            {
                id: 13,
                question: "Which of the following statements about method parameters is true?",
                options: [
                    "A method parameter is a global variable.",
                    "The scope of a method parameter is limited to the block where it is declared.",
                    "A method parameter is a local variable whose scope covers the entire method.",
                    "A method parameter must be declared outside the method."
                ],
                answer: "A method parameter is a local variable whose scope covers the entire method."
            },
            {
                id: 14,
                question: "What will happen if you run the following code?",
                code: `public static void main(String[] args) {
    for (int i = 0; i < 5; i++) {
        System.out.println(i);
    }
    System.out.println(i);
}
`,
                options: [
                    "The program prints numbers from 0 to 4 and then throws a runtime error.",
                    "The program prints numbers from 0 to 4 and then prints 5.",
                    "The program will not compile due to a syntax error.",
                    "The program executes without error but prints numbers incorrectly."
                ],
                answer: "The program will not compile due to a syntax error."
            },
        ]
    },
    {
        id: "post-test-3",
        title: "Post Test Methods",
        questions: [
            {
                id: 1,
                question: "Why is it beneficial to use parameters in methods?",
                options: [
                    "They improve code readability and allow methods to be reused for different inputs.",
                    "They make methods faster to execute.",
                    "They automatically generate loops within the method.",
                    "They eliminate the need for return statements."
                ],
                answer: "They improve code readability and allow methods to be reused for different inputs."
            },
            {
                id: 2,
                question: "What is the difference between a void method and a value-returning method?",
                options: [
                    "A void method performs a task but does not return a value, while a value-returning method performs a task and returns a value.",
                    "A void method can have parameters, but a value-returning method cannot",
                    "A void method cannot use loops, while a value-returning method can.",
                    "A void method must be static, but a value-returning method cannot be static."
                ],
                answer: "A void method performs a task but does not return a value, while a value-returning method performs a task and returns a value."
            },
            {
                id: 3,
                question: "What does the method signature consist of?",
                options: [
                    "Method name and parameters",
                    "Method body and return type",
                    "Modifier, method name, and body",
                    "Parameter list and return type"
                ],
                answer: "Method name and parameters"
            },
            {
                id: 4,
                question: "Which of the following is true about a method that returns void?",
                options: [
                    "It can be treated as a value.",
                    "It must be called as a statement.",
                    "It cannot have parameters.",
                    "It always contains a return statement."
                ],
                answer: "It must be called as a statement."
            },
            {
                id: 5,
                question: "Which of the following correctly calls a method findMax(int a, int b) and stores the result?",
                options: [
                    "int max = findMax(5, 10);",
                    "findMax(5, 10);",
                    "System.out.println(findMax(5, 10));",
                    "Both a and c"
                ],
                answer: "Both a and c"
            },
            {
                id: 6,
                question: "In the context of the text, which of the following is true about value-returning methods?",
                options: [
                    "They cannot be invoked as part of a statement.",
                    "They must include a return statement to return a value.",
                    "They must always return a numeric value.",
                    "They do not require a method header."
                ],
                answer: "They must include a return statement to return a value."
            },
            {
                id: 7,
                question: "Which of the following statements correctly demonstrates the difference between invoking printGrade(78.5) and getGrade(78.5)?",
                options: [
                    "printGrade(78.5); is a statement, while getGrade(78.5) can be used in expressions.",
                    "Both must be invoked as statements.",
                    "getGrade(78.5) prints the grade directly, while printGrade(78.5) returns the grade.",
                    "printGrade(78.5) returns the grade as a character."
                ],
                answer: "printGrade(78.5); is a statement, while getGrade(78.5) can be used in expressions."
            },
            {
                id: 8,
                question: "Which of the following is a characteristic of pass-by-value in Java?",
                options: [
                    "The method modifies the original variable.",
                    "The method must return the modified value to the caller.",
                    "The argument and the parameter share the same memory location.",
                    "A copy of the argument’s value is passed to the method parameter."
                ],
                answer: "A copy of the argument’s value is passed to the method parameter."
            },
            {
                id: 9,
                question: "In the program below, what will the value of x be after the method call?",
                code: `public static void main(String[] args) {
    int x = 5;
    increment(x);
    System.out.println(x);
}
public static void increment(int n) {
    n++;
}
`,
                options: [
                    "6",
                    "5",
                    "Compilation Error",
                    "Runtime Error"
                ],
                answer: "5"
            },
            {
                id: 10,
                question: "What will happen if you call the following method as printMessage(5, `Hi`)?",
                code: `public static void printMessage(String message, int n) {
    for (int i = 0; i < n; i++) {
        System.out.println(message);
    }
}
`,
                options: [
                    "The method will print `Hi` five times.",
                    "The method will throw a runtime error.",
                    "The program will fail to compile due to mismatched argument types.",
                    "The method will swap the arguments and print `5` twice."
                ],
                answer: "The program will fail to compile due to mismatched argument types."
            },
            {
                id: 11,
                question: "Which of the following is a key advantage of using methods to modularize code?",
                options: [
                    "It allows the program to run without a main method.",
                    "It reduces redundant code, improving program quality and maintainability.",
                    "It replaces the need for variables and loops in the program.",
                    "It ensures that the code can only be executed once."
                ],
                answer: "It reduces redundant code, improving program quality and maintainability."
            },
            {
                id: 12,
                question: "Which of the following is NOT true about local variables?",
                options: [
                    "A local variable must be declared before it can be used.",
                    "A local variable can be declared multiple times in nested blocks.",
                    "A local variable’s scope ends at the block that contains it.",
                    "A local variable declared in a for-loop header is in scope for the entire loop."
                ],
                answer: "A local variable can be declared multiple times in nested blocks."
            },
            {
                id: 13,
                question: "Why does the following code result in a syntax error?",
                code: `public static void method() {
    for (int i = 0; i < 10; i++) {
        System.out.println(i);
    }
    System.out.println(i);
}
`,
                options: [
                    "Variable i is already used inside the loop.",
                    "Variable i goes out of scope outside the loop.",
                    "Variable i cannot be declared inside a loop.",
                    "Variable i is overwritten by another variable."
                ],
                answer: "Variable i goes out of scope outside the loop."
            },
            {
                id: 14,
                question: "What will happen if a local variable is declared inside a block but used outside the block??",
                options: [
                    "The program will execute normally without any errors.",
                    "The program will throw a runtime error.",
                    "The program will fail to compile because the variable is out of scope.",
                    "The program will automatically re-declare the variable."
                ],
                answer: "The program will fail to compile because the variable is out of scope."
            },
        ]
    }

]