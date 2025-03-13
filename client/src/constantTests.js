export const tests = [
    {
        id: "pre-test-1",
        title: "Pre-Test Control Structures",
        questions: [
            {
                id: 1,
                question: "What is the correct operator to replace ___ in the following condition so that it correctly checks if number is negative or greater than 100?",
                code: `if (number < 0 ___ number > 100) {
  System.out.println("The number is either negative or greater than 100.");
}
`,
                options: [
                    "&&",
                    "!",
                    "==",
                    "||"
                ],
                answer: "||"
            },
            {
                id: 2,
                question: "Which of the following Boolean expressions correctly checks if number is between 1 and 10 (inclusive)?",

                options: [
                    "if (number >= 1 || number <= 10)",
                    "if (number >= 1 && number <= 10)",
                    "if (number > 1 && number < 10)",
                    "if (number == 1 && number == 10)"
                ],
                answer: "if (number >= 1 && number <= 10)"
            },
        ]

    },

    {
        id: "post-test-1",
        title: "Post-Test Control Structures",
        questions: [
            {
                id: 1,
                question: "Which operator should replace ___ to correctly check if a number is both even and greater than 20?",
                code: `if (number % 2 == 0 ___ number > 20) {
   System.out.println("The number is even and greater than 20.");
}
`,
                options: [
                    "!=",
                    "||",
                    "&&",
                    "=="
                ],
                answer: "&&"
            },
            {
                id: 2,
                question: "Which of the following Boolean expressions correctly checks if number is between 5 and 20 (inclusive)?",
                options: [
                    "if (number >= 5 || number <= 20)",
                    "if (number == 5 && number == 20)",
                    "if (number > 5 && number < 20)",
                    "if (number >= 5 && number <= 20)"
                ],
                answer: "if (number >= 5 && number <= 20)"
            },
            {
                id: 3,
                question: "In the following program, what should replace the first blank (___) to correctly check if a number is positive?",
                code: `if (number > ___) {
   if (number % 2 == 0) {
       System.out.println("The number is positive and even.");
   } else {
       System.out.println("The number is positive and odd.");
   }
}
`,
                options: [
                    "1",
                    "0",
                    "-1",
                    "null"
                ],
                answer: "0"
            },
        ]
    },
    {
        id: "pre-test-2",
        title: "Pre-Test Loops",
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
                    `Java Programming
Java Programming
Java Programming
`,
                    `Java Programming
Java Programming`,
                    "Nothing"
                ],
                answer: `Java Programming
Java Programming
Java Programming
`
            },
            {
                id: 2,
                question: "Write a Java program that prints `Hello, World!` on the screen. Fill in the missing parts to complete the program.",
                code: `public class HelloWorld {
    public static void main(String[] args) {
        ___.___.___    ("Hello, World!");
    }
}
    `,
                options: [
                    "System.out(`Hello, World!`)",
                    "System.println(`Hello, World!`)",
                    "System.out.println(`Hello, World!`)",
                    "System.print.out(`Hello, World!`)"
                ],
                answer: "System.out.println(`Hello, World!`)"
            },
            {
                id: 3,
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
                id: 4,
                question: "What will the following code output if the user enters 2, 3, and 0?",
                code: `int sum = 0;
int data;
Scanner input = new Scanner(System.in);

do {
    System.out.print("Enter an integer (0 to stop): ");
    data = input.nextInt();
    sum += data;
} while (data != 0);

System.out.println("The sum is " + sum);`,
                options: [
                    "The sum is 0",
                    "The sum is 2",
                    "The sum is 5",
                    "The sum is 3"
                ],
                answer: "The sum is 5"
            },
            {
                id: 5,
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
                id: 6,
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
}`,
                    `int i = 1;
while (i <= 10) {
    System.out.println(i);
    i++;
}`,
                    `int i = 10;
while (i > 1) {
    System.out.println(i);
    i++;
}`,
                    `int i = 0;
while (i <= 10) {
    System.out.println(i);
    i--;
}`
                ],
                answer: `int i = 1;
while (i <= 10) {
    System.out.println(i);
    i++;
}
`
            },
            {
                id: 7,
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
                id: 8,
                question: "What will be the output of the following code?",
                code: `int sum = 0;
for (int i = 1; i <= 5; i++) {
    if (i == 3) break;
    sum += i;
}
System.out.println(sum);`,
                options: [
                    "6",
                    "15",
                    "3",
                    "10"
                ],
                answer: "6"
            },
            {
                id: 9,
                question: "What happens when the following code runs?",
                code: `int i = 0;
while (i < 5) {
    if (i % 2 == 0) continue;
    i++;
    System.out.println(i);
}
`,
                options: [
                    `It will terminate normally.`,
                    `It will create an infinite loop.`,
                    `It will print all numbers from 1 to 5.`,
                    `It will skip even numbers but terminate.`
                ],
                answer: `It will create an infinite loop.`
            },
        ]
    },

    {
        id: "post-test-2",
        title: "Post-Test Loops",
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
                    `5
5
5
`,
                    `3
                    3
                    3`,
                    `5
                    4
                    3`,
                    `3`
                ],
                answer: `5
5
5
`
            },
            {
                id: 2,
                question: "Write a Java program that calculates and prints the sum of two numbers. Fill in the missing parts to complete the program.",
                code: `public class CalculateSum {
    public static void main(String[] args) {
        int num1 = 10;
        int num2 = 20;
        int sum = num1 + num2;
        ___.___.----(___);
    }
}`,
                options: [
                    "System.out(sum)",
                    "System.println(sum)",
                    "System.out.println(sum)",
                    "System.print.out(sum)"
                ],
                answer: "System.out.println(sum)"
            },
            {
                id: 3,
                question: "Why does the following code cause an infinite loop even after the correct number is guessed?",
                code: `
                int number = (int)(Math.random() * 101);
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
                id: 4,
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

System.out.println("max is " + max);`,
                options: [
                    "max is 5",
                    "max is 7",
                    "max is 2",
                    "max is 0"
                ],
                answer: "max is 7"
            },
            {
                id: 5,
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
                id: 6,
                question: "Convert the following for loop into a do-while loop:",
                code: `for (int i = 5; i > 0; i--) {
    System.out.println("Countdown: " + i);
}
`,
                options: [
                    `int i = 5;
do {
    System.out.println("Countdown: " + i);
    i--;
} while (i > 0)`,
                    `int i = 5;
do {
    System.out.println("Countdown: " + i);
    i++;
} while (i < 5)`,
                    `int i = 0;
do {
    System.out.println("Countdown: " + i);
    i++;
} while (i < 0)
`,
                    `int i = 5;
do {
    i--;
    System.out.println("Countdown: " + i);
} while (i >= 0)`
                ],
                answer: `int i = 5;
do {
    System.out.println("Countdown: " + i);
    i--;
} while (i > 0)`
            },
            {
                id: 7,
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
                id: 8,
                question: "What is the output of the following code if n = 15?",
                code: `int factor = 2;
while (factor <= n) {
    if (n % factor == 0) break;
    factor++;
}
System.out.println(factor);`,
                options: [
                    "3",
                    "5",
                    "15",
                    "2"
                ],
                answer: "3"
            },
            {
                id: 9,
                question: "What is the corrected version of the following code to avoid an infinite loop?",
                code: `int i = 0;
while (i < 5) {
    if (i % 2 == 0) continue;
    i++;
    System.out.println(i);
}
`,
                options: [
                    `Move i++ inside the if block.`,
                    `Remove the continue statement.`,
                    `Add i++ before the if block.`,
                    `Replace while with for.`
                ],
                answer: `Add i++ before the if block.`
            },
        ]
    },

    {
        id: "pre-test-3",
        title: "Pre Test Methods",
        questions: [
            {
                id: 1,
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
                id: 2,
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
                id: 3,
                question: "In the provided printGrade method, how can you terminate the method early when the score is invalid?",
                options: [
                    "By not including a return statement.",
                    "By adding an extra else condition for invalid scores.",
                    "By using the statement return; after checking for an invalid score.",
                    "By throwing an exception for invalid scores."
                ],
                answer: "By using the statement return; after checking for an invalid score."
            },
            {
                id: 4,
                question: "Consider the method nPrintln(String message, int n) from the text. What will happen if you call the method like this:nPrintln(3, `Hello`);",
                options: [
                    "The method prints `Hello` three times.",
                    "The method prints an error message.",
                    "A compilation error occurs because the argument order does not match the parameter order.",
                    "The method swaps the arguments and executes normally."
                ],
                answer: "A compilation error occurs because the argument order does not match the parameter order."
            },
            {
                id: 5,
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
                id: 6,
                question: "What will happen if you run the following code?",
                code: `public static void main(String[] args) {
    for (int i = 0; i < 5; i++) {
        System.out.println(i);
    }
    System.out.println(i);
}`,
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
                question: "What is the difference between a void method and a value-returning method?",
                options: [
                    "A void method performs a task but does not return a value, while a value-returning method performs a task and returns a value.",
                    "A void method can have parameters, but a value-returning method cannot.",
                    "A void method cannot use loops, while a value-returning method can.",
                    "A void method must be static, but a value-returning method cannot be static."
                ],
                answer: "A void method performs a task but does not return a value, while a value-returning method performs a task and returns a value."
            },
            {
                id: 2,
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
                id: 3,
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
                id: 4,
                question: "What will happen if you call the following method as printMessage(5, `Hi`)?",
                code: `public static void printMessage(String message, int n) {
    for (int i = 0; i < n; i++) {
        System.out.println(message);
    }
}`,
                options: [
                    "The method will print `Hi` five times.",
                    "The method will throw a runtime error.",
                    "The program will fail to compile due to mismatched argument types.",
                    "The method will swap the arguments and print `5` twice."
                ],
                answer: "The program will fail to compile due to mismatched argument types."
            },
            {
                id: 5,
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
                id: 6,
                question: "Why does the following code result in a syntax error?",
                code: `public static void method() {
    for (int i = 0; i < 10; i++) {
        System.out.println(i);
    }
    System.out.println(i);
}`,
                options: [
                    "Variable i is already used inside the loop.",
                    "Variable i goes out of scope outside the loop.",
                    "Variable i cannot be declared inside a loop.",
                    "Variable i is overwritten by another variable."
                ],
                answer: "Variable i goes out of scope outside the loop."
            },
        ]
    }

]