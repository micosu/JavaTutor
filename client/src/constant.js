export const modules = [
    {
        moduleId: 1,
        moduleName: "Control Structures",
        questions: [
            {
                questionId: 1,
                headerTopic: "Control Structures",
                problemStatement: "Write a Java program that checks if a number is between 1 and 10 (inclusive) using an if-else statement. Fill in the blanks to complete the program.",
                input: "5",
                output: "The number is between 1 and 10.",
                code: `
    public class NumberCheck {
    public static void main(String[] args) {
        int number = 5;

        if (number >= 1 ___ number <= 10) {
            System.out.println("The number is between 1 and 10.");
        } else {
            System.out.println("The number is not between 1 and 10.");
        }
    }
}
    `,
                correctAnswers: ["&&"]
            },
            {
                questionId: 2,
                headerTopic: "Control Structures",
                problemStatement: "Write a Java program that checks if a number is negative or greater than 100 using an if-else statement. Fill in the blanks to complete the program.",
                input: "-5",
                output: "The number is either negative or greater than 100.",
                code: `public class NumberCheck {
    public static void main(String[] args) {
        int number = -5;

        if (number < 0 ___ number > 100) {
            System.out.println("The number is either negative or greater than 100.");
        } else {
            System.out.println("The number is between 0 and 100.");
        }
    }
}
`,
                correctAnswers: ["||"]
            },
            {
                questionId: 3,
                headerTopic: "Control Structures",
                problemStatement: "Write a Java program that checks if a person is eligible for a discount. The person must be either a senior citizen (age 65 or older) or a student (with a student ID). Fill in the blanks to complete the program. Please only enter the input given in the Input field as all other inputs will result in a wrong answer.",
                input: "age = 70, hasStudentID = false",
                output: "The person is eligible for a discount.",
                code: `public class DiscountCheck {
    public static void main(String[] args) {
        int age = 70;
        //This value can be true or false. For the purpose of this question, it will be set to false as indicated in the input on the left.
        boolean hasStudentID = ___;

        if (age ___ 65 || ___) {
            System.out.println("The person is eligible for a discount.");
        } else {
            System.out.println("The person is not eligible for a discount.");
        }
    }
}

`,
                correctAnswers: ["false", ">=", "hasStudentID"]
            },
            {
                questionId: 4,
                headerTopic: "Control Structures",
                problemStatement: "Write a Java program that checks whether a number is positive, negative, or zero. Then, if the number is positive, check if it is even or odd using nested if-else statements. Fill in the blanks to complete the program.",
                input: "number = 5",
                output: "The number is positive and odd.",
                code: `public class NumberCheck {
    public static void main(String[] args) {
        int number = 5;

        if (number > ___) {
            if (number % ___ == 0) {
                System.out.println("The number is positive and even.");
            } else {
                System.out.println("The number is positive and odd.");
            }
        } else if (number < ___) {
            System.out.println("The number is negative.");
        } else {
            System.out.println("The number is zero.");
        }
    }
}
`,
                correctAnswers: ["0", "2", "0"]
            },
            {
                questionId: 5,  // ✅ Added an MCQ question
                questionType: "mcq",
                headerTopic: "Control Structures",
                problemStatement: "Consider the following code. Which option correctly fills all the blanks in the program?",
                code: `    
import java.util.Scanner;

public class SubtractionQuiz {
    public static void main(String[] args) {
        // Generate two random single-digit numbers
        int number1 = (int) (Math.random() * 10);
        int number2 = (int) (Math.random() * 10);

        // Ensure number1 is greater than or equal to number2 to avoid negative results
        if (number1 < number2) {
            // _________ number1 and number2;
            int temp = number1;
            number1 = number2;
            number2 = temp;
        }

        // Prompt the user with the subtraction question
        System.out.print("What is " + number1 + " - " + number2 + "? ");
        Scanner input = new Scanner(System.in);
        int answer = input.________();

        // Check the answer
        if (answer == ________ - ________) {
            System.out.println("Correct! Good job.");
        } else {
            System.out.println("Incorrect. The correct answer is " + (number1 - number2));
        }

        // Close the scanner
        input.________();
    }
}
`,
                options: ["Swap number1 and number2; nextInt(); number1 - number2; close();",
                    "Reverse number1 and number2; nextIn(); number2 - number1; stop();",
                    "Set number1 equal to number2; nextIn(); number1 - number2; terminate();",
                    "Switch number1 and number2; nextDouble(); number1 + number2; end();"],  // ✅ Multiple-choice options
                correctAnswer: "Swap number1 and number2; nextInt(); number1 - number2; close();"
            }
        ]
    },
    {
        moduleId: 2,
        moduleName: "Loops",
        questions: [
            {
                questionId: 1,
                headerTopic: "Loops in Java",
                problemStatement: "Write a Java Program to run a for loop to print the numbers from 1 to 5 in series.",
                input: "There is no input for this question",
                output: "1 2 3 4 5",
                code: `
    //Define Class
    public class PrintNumbers {
        //Define Function
        public static void main(String[] args) {
            //For loop
            for (int i = ___; i ___ 5; i___ ) {
                //Print Statement
                System.out.println(i);
            //Closing Bracket
            }
        }
    }
    `,
                correctAnswers: ["1", "<=", "++"]
            },
            {
                questionId: 2,
                headerTopic: "Loops in Java",
                problemStatement: "Write a Java program that prints the first 10 even numbers (i.e., 2, 4, 6, ..., 20) using a for loop. Fill in the blanks to complete the program",
                input: "There is no input for this question",
                output: "2 4 6 8 10 12 14 16 18 20",
                code: `public class EvenNumbers {
    public static void main(String[] args) {
        for (int i = ___; i ___ 20; i += ___) {
            System.out.println(i);
        }
    }
}
`,
                correctAnswers: ["2", "<=", "2"]
            },
            {
                questionId: 3,
                headerTopic: "Loops in Java",
                problemStatement: "Write a Java program that prints the numbers from 10 down to 1 using a for loop. Fill in the blanks to complete the program.",
                input: "There is no input for this question",
                output: "10 9 8 7 6 5 4 3 2 1",
                code: `public class Countdown {
    public static void main(String[] args) {
        for (int i = ___; i ___ 1; i___) {
            System.out.println(i);
        }
    }
}
`,
                correctAnswers: ["10", ">=", "--"]
            },
            {
                questionId: 4,
                headerTopic: "Loops in Java",
                problemStatement: "Write a Java program that prints the numbers from 1 to 5 using a while loop. Fill in the blanks to complete the program",
                input: "There is no input for this question",
                output: "1 2 3 4 5",
                code: `public class PrintNumbers {
    public static void main(String[] args) {
        int i = ___;
        while (i ___ 5) {
            System.out.println(i);
            i___;
        }
    }
}
`,
                correctAnswers: ["1", "<=", "++"]
            },
            {
                questionId: 5,
                headerTopic: "Loops in Java",
                problemStatement: "Write a Java program that prints the numbers from 10 down to 1 using a while loop. Fill in the blanks to complete the program.",
                input: "There is no input for this question",
                output: "10 9 8 7 6 5 4 3 2 1",
                code: `public class Countdown {
    public static void main(String[] args) {
        int i = ___;
        while (i ___ 1) {
            System.out.println(i);
            i___;
        }
    }
}

`,
                correctAnswers: ["10", ">=", "--"]
            },
            {
                questionId: 6,
                headerTopic: "Loops in Java",
                problemStatement: "Write a Java program that calculates the sum of numbers from 1 to n using a while loop, where n = 10. Fill in the blanks to complete the program.",
                input: "There is no input for this question",
                output: "Sum of numbers from 1 to 10 is 55",
                code: `public class SumNumbers {
    public static void main(String[] args) {
        int n = 10;
        int sum = 0;
        int i = ___;

        while (i ___ n) {
            sum ___ i;
            i___;
        }

        System.out.println("Sum of numbers from 1 to " + n + " is " + sum);
    }
}
`,
                correctAnswers: ["1", "<=", "+=", "++"]
            },
            {
                questionId: 7,
                headerTopic: "Loops in Java",
                problemStatement: "Write a Java program that prints the numbers from 1 to 5 using a do-while loop. Fill in the blanks to complete the program.",
                input: "There is no input for this question",
                output: "1 2 3 4 5",
                code: `public class PrintNumbers {
    public static void main(String[] args) {
        int i = ___;
        do {
            System.out.println(i);
            i___;
        } while (i ___ 5);
    }
}
`,
                correctAnswers: ["1", "++", "<="]
            },
            {
                questionId: 8,
                headerTopic: "Loops in Java",
                problemStatement: "Write a Java program that prints the sum of numbers from 1 to 10 using a do-while loop. Fill in the blanks to complete the program",
                input: "There is no input for this question",
                output: "The sum is: 55",
                code: `public class SumNumbers {
    public static void main(String[] args) {
        int i = ___;
        int sum = ___;
        do {
            sum += ___;
            i___;
        } while (i ___ 10);
        
        System.out.println("The sum is: " + sum);
    }
}
`,
                correctAnswers: ["1", "0", "i", "++", "<="]
            },
            {
                questionId: 9,  // ✅ Added an MCQ question
                questionType: "mcq",
                headerTopic: "Loops in Java",
                problemStatement: "Examine the following Java code. What will happen when this code is executed?",
                code: `    
public class ScopeTest {
                public static void main(String[] args) {
                    for(int i = 0; i< 5; i++) {
                System.out.println("Inside loop: " + i);
            }
        System.out.println("Outside loop: " + i);
    }
}
`,
                options: [
                    "It will print values from 0 to 4 inside the loop and then print the final value of i outside the loop.",
                    "It will print values from 0 to 4 inside the loop but throw an error for the line outside the loop",
                    "It will throw a compile-time error because the variable i is not initialized outside the loop.",
                    "It will run without any errors, but nothing will be printed outside the loop"],  // ✅ Multiple-choice options
                correctAnswer: "It will print values from 0 to 4 inside the loop but throw an error for the line outside the loop"
            },
            {
                questionId: 10,  // ✅ Added an MCQ question
                questionType: "mcq",
                headerTopic: "Loops in Java",
                problemStatement: "Consider the following code. How can you correct this code so that it prints the final value of i after the loop completes?",
                code: `    
public class LoopVariableScope {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.println("Loop value of i: " + i);
        }
        System.out.println("Final value of i: " + i);
    }
}
`,
                options: ["Remove the line System.out.println(`Final value of i: ` + i); as it is unnecessary.",
                    "Declare i outside the loop, like this: int i = 0; for (; i < 10; i++).",
                    "Use System.out.println(`Final value of i: ` + (i - 1)); to print the final loop value.",
                    "Initialize i as a global variable outside the main method."],  // ✅ Multiple-choice options
                correctAnswer: "Declare i outside the loop, like this: int i = 0; for (; i < 10; i++)."
            },

            {
                questionId: 11,  // ✅ Added an MCQ question
                questionType: "mcq",
                headerTopic: "Loops in Java",
                problemStatement: "Consider the following code. What should replace the first blank (___) to correctly take input from the user?",
                code: `    
import java.util.Scanner;

public class PositiveNumberCheck {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int number;
        
        do {
            System.out.print("Enter a positive number: ");
            number = ___;
        } while (number ___ 0);
        
        System.out.println("You entered a positive number: " + number);
    }
}
`,
                options: ["scan.nextLine();",
                    "scan.nextInt();",
                    "number;",
                    "System.out.println();"],  // ✅ Multiple-choice options
                correctAnswer: "scan.nextInt();"
            },
            {
                questionId: 12,  // ✅ Added an MCQ question
                questionType: "mcq",
                headerTopic: "Loops in Java",
                problemStatement: "Consider the following code. What should replace the second blank (___) to ensure the loop continues until a positive number is entered?",
                code: `    
import java.util.Scanner;

public class PositiveNumberCheck {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int number;
        
        do {
            System.out.print("Enter a positive number: ");
            number = ___;
        } while (number ___ 0);
        
        System.out.println("You entered a positive number: " + number);
    }
}
`,
                options: ["<",
                    ">",
                    "<=",
                    ">="],  // ✅ Multiple-choice options
                correctAnswer: "<="
            },
            {
                questionId: 13,
                headerTopic: "Loops in Java",
                problemStatement: "Write a Java program that takes a number between 1 and 5. If the number is valid, print a countdown from that number to 1 using a loop. If the number is invalid (less than 1 or greater than 5), print an error message. Use nested if-else statements and a loop. Fill in the blanks to complete the program.",
                input: "number = 3",
                output: "3 2 1",
                code: `public class Countdown {
    public static void main(String[] args) {
	 
        int number = 3;

        if (number >= 1 ___ number <= 5) {
            for (int i = number; i ___ 0; i___) {
                System.out.println(i);
            }
        } else {
            System.out.println("Invalid number. Please enter a number between 1 and 5.");
        }
    }
}
`,
                correctAnswers: ["&&", ">", "--"]
            },
        ]
    },
    {
        moduleId: 3,
        moduleName: "Methods",
        questions: [
            {
                questionId: 1,
                headerTopic: "Methods",
                problemStatement: "Write a Java program that defines a method greet() to print `Hello, World!`. Then, call this method from the main() method. Fill in the blanks to complete the program.",
                input: "There is no input for this question",
                output: "Hello, World!",
                code: `public class MethodExample {
    public static void main(String[] args) {
        ___;
    }

    public static void ___() {
        System.out.println("Hello, World!");
    }
}`,
                correctAnswers: ["greet()", "greet"]
            },
            {
                questionId: 2,
                headerTopic: "Methods",
                problemStatement: "Write a Java program that defines a method add() that takes two integers as parameters and returns their sum. Call this method from the main() method and print the result. Fill in the blanks to complete the program. Make sure you don't add any whitespaces in your answers.",
                input: "10 20",
                output: "The sum is: 30",
                code: `public class AddNumbers {
    public static void main(String[] args) {
        int result = ___(10, 20);
        System.out.println("The sum is: " + result);
    }

    public static ___ add(int a, int b) {
        return ___;
    }
}`,
                correctAnswers: ["add", "int", "a+b"]
            },
            {
                questionId: 3,
                headerTopic: "Methods",
                problemStatement: "Write a Java program that defines a method isEven() that checks if a number is even. If the number is even, return true, otherwise return false. Use this method inside the main() method to check if the number 15 is even. Fill in the blanks to complete the program",
                input: "15",
                output: "The number is odd.",
                code: `public class EvenCheck {
    public static void main(String[] args) {
        boolean result = ___(15);
        if (result) {
            System.out.println("The number is even.");
        } else {
            System.out.println("The number is odd.");
        }
    }

    public static ___ isEven(int number) {
        return number ___ 2 == 0;
    }
}`,
                correctAnswers: ["isEven", "boolean", "%"]
            },
            {
                questionId: 4,
                headerTopic: "Methods",
                problemStatement: "Write a Java program that defines a maximum function which returns the maximum number from two numbers given as a parameter",
                input: "10 20",
                output: "The maximum number is: 20",
                code: `public class MaximumFinder {
    
    // Method to find the maximum of two numbers
    public static int maximum(int num1, int num2) {
        if (___ ___ ___) {
            return num1;
        } else {
            return ___;
        }
    }

    public static void main(String[] args) {
        // Test the maximum function
        int result = ___(10, 20);  // Call the maximum function with two numbers
        System.out.println("The maximum number is: " + result);
    }
}`,
                correctAnswers: ["num1", ">", "num2", "num2", "maximum"]
            },
            {
                questionId: 5,
                headerTopic: "Methods",
                problemStatement: "Write a Java program that includes two methods:\n\n"
                    + "getGrade Method:\n"
                    + "- This method takes a numeric score as a parameter.\n"
                    + "- It returns a letter grade based on the following criteria:\n"
                    + "    A: 90-100\n"
                    + "    B: 80-89\n"
                    + "    C: 70-79\n"
                    + "    D: 60-69\n"
                    + "    F: Below 60\n\n"
                    + "printGrade Method:\n"
                    + "- This method takes a numeric score as a parameter.\n"
                    + "- It calls the getGrade method to get the corresponding letter grade.\n"
                    + "- It prints both the numeric score and its letter grade.",
                input: "85",
                output: "The score of 85 has a grade of B",
                code: `public class GradeCalculator {

    // Method to get letter grade based on numeric score
    public static char getGrade(int score) {
        if (___ >= ___ ___ score <= 100) {
            return 'A';
        } else if (score >= 80 && ___ < ___) {
            return 'B';
        } else if (score >= 70 && score < 80) {
            return ___;
        } else if (score >= 60 ___ score < 70) {
            return 'D';
        } else {
            return ___;
        }
    }

    // Method to print the numeric score and corresponding grade
    public static void printGrade(int score) {
        char grade = ___(score);
	 System.out.println("The score of " + score + " has a grade of " + grade);

    }

    public static void main(String[] args) {

	// Call the right method to print the grade
	___(85);
    }
}
`,
                correctAnswers: ["score", "90", "&&", "score", "90", "'C'", "&&", "'F'", "getGrade", "printGrade"]
            }
        ]
    }
];
