package com.learningportal.config;

import com.learningportal.entity.*;
import com.learningportal.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Sample data initializer for testing Phase 2 infrastructure.
 * Creates one Java module with one sample topic to test the UI.
 * 
 * DISABLED: Use ContentDataInitializer instead for loading real content from markdown files.
 */
// @Component  // Disabled - using ContentDataInitializer instead
public class SampleDataInitializer implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(SampleDataInitializer.class);
    
    private final LearningModuleRepository moduleRepository;
    private final TopicRepository topicRepository;
    private final PracticeQuestionRepository questionRepository;
    private final CodeExampleRepository codeExampleRepository;
    
    public SampleDataInitializer(LearningModuleRepository moduleRepository,
                                  TopicRepository topicRepository,
                                  PracticeQuestionRepository questionRepository,
                                  CodeExampleRepository codeExampleRepository) {
        this.moduleRepository = moduleRepository;
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.codeExampleRepository = codeExampleRepository;
    }
    
    @Override
    @Transactional
    public void run(String... args) {
        if (moduleRepository.count() > 0) {
            logger.info("Sample data already exists. Skipping initialization.");
            return;
        }
        
        logger.info("Initializing sample data for testing...");
        
        // Create Java Module
        LearningModule javaModule = new LearningModule();
        javaModule.setName("Java Programming");
        javaModule.setDescription("Master Java programming from fundamentals to advanced concepts. " +
                "This comprehensive module covers everything you need to become a Java expert.");
        javaModule.setType(ModuleType.JAVA);
        javaModule.setOrderIndex(1);
        javaModule = moduleRepository.save(javaModule);
        
        // Create Sample Topic: Variables and Data Types
        Topic variablesTopic = createVariablesTopic(javaModule);
        variablesTopic = topicRepository.save(variablesTopic);
        
        // Create Sample Practice Questions
        createSampleQuestions(variablesTopic);
        
        // Create Sample Code Examples
        createSampleCodeExamples(variablesTopic);
        
        logger.info("Sample data initialization complete!");
        logger.info("Created 1 module, 1 topic, 3 questions, and 5 code examples");
    }
    
    private Topic createVariablesTopic(LearningModule module) {
        Topic topic = new Topic();
        topic.setModule(module);
        topic.setTitle("Variables and Data Types");
        topic.setDescription("Learn about Java variables, primitive data types, and type conversion. " +
                "Understand how to declare, initialize, and use variables effectively.");
        topic.setDifficulty(DifficultyLevel.BEGINNER);
        topic.setOrderIndex(1);
        topic.setEstimatedMinutes(45);
        
        // Sample content (simplified version - full content would follow Content_Methodology_v3_Framework)
        String content = """
# Variables and Data Types

## What are Variables?

A variable is a container that holds data that can be changed during program execution. 
Think of it as a labeled box where you can store information.

## Primitive Data Types in Java

Java has 8 primitive data types:

### Numeric Types
- **byte**: 8-bit integer (-128 to 127)
- **short**: 16-bit integer (-32,768 to 32,767)
- **int**: 32-bit integer (-2^31 to 2^31-1)
- **long**: 64-bit integer (-2^63 to 2^63-1)
- **float**: 32-bit floating point
- **double**: 64-bit floating point

### Other Types
- **char**: 16-bit Unicode character
- **boolean**: true or false

## Variable Declaration

```java
// Declaration
int age;

// Declaration with initialization
int age = 25;

// Multiple declarations
int x = 10, y = 20, z = 30;
```

## Type Conversion

### Implicit Conversion (Widening)
```java
int myInt = 100;
long myLong = myInt;  // Automatic conversion
double myDouble = myLong;  // Automatic conversion
```

### Explicit Conversion (Narrowing)
```java
double myDouble = 9.78;
int myInt = (int) myDouble;  // Manual casting
```

## Best Practices

1. Use meaningful variable names
2. Initialize variables before use
3. Choose appropriate data types
4. Use final for constants
5. Follow naming conventions (camelCase)

## Common Mistakes

- Forgetting to initialize variables
- Integer overflow
- Loss of precision in type conversion
- Using wrong data type for the task

---

*This is a sample topic. Full content will follow the Content_Methodology_v3_Framework with all 10 layers.*
""";
        
        topic.setContent(content);
        return topic;
    }
    
    private void createSampleQuestions(Topic topic) {
        // Question 1: Core Exercise
        PracticeQuestion q1 = new PracticeQuestion();
        q1.setTopic(topic);
        q1.setTitle("Declare and Initialize Variables");
        q1.setDescription("Create variables of different data types and initialize them with appropriate values.");
        q1.setDifficulty(DifficultyLevel.BEGINNER);
        q1.setType(QuestionType.CORE_EXERCISE);
        q1.setOrderIndex(1);
        q1.setHints("[\"Start with int and double\", \"Remember to use semicolons\", \"Use meaningful names\"]");
        q1.setSolution("int age = 25; double price = 19.99; char grade = 'A'; boolean isActive = true;");
        questionRepository.save(q1);
        
        // Question 2: Edge Case Drill
        PracticeQuestion q2 = new PracticeQuestion();
        q2.setTopic(topic);
        q2.setTitle("Handle Integer Overflow");
        q2.setDescription("What happens when you exceed the maximum value of an int?");
        q2.setDifficulty(DifficultyLevel.INTERMEDIATE);
        q2.setType(QuestionType.EDGE_CASE_DRILL);
        q2.setOrderIndex(2);
        q2.setHints("[\"Try Integer.MAX_VALUE + 1\", \"It wraps around\", \"Use long for larger values\"]");
        q2.setSolution("int max = Integer.MAX_VALUE; int overflow = max + 1; // Results in Integer.MIN_VALUE");
        questionRepository.save(q2);
        
        // Question 3: Challenge
        PracticeQuestion q3 = new PracticeQuestion();
        q3.setTopic(topic);
        q3.setTitle("Type Conversion Challenge");
        q3.setDescription("Convert between different numeric types without losing data.");
        q3.setDifficulty(DifficultyLevel.INTERMEDIATE);
        q3.setType(QuestionType.CHALLENGE);
        q3.setOrderIndex(3);
        q3.setHints("[\"Check range before conversion\", \"Use wrapper classes\", \"Handle exceptions\"]");
        q3.setSolution("Use appropriate checks and casting: if (value <= Integer.MAX_VALUE) { int result = (int) value; }");
        questionRepository.save(q3);
    }
    
    private void createSampleCodeExamples(Topic topic) {
        // Java Example
        CodeExample javaExample = new CodeExample();
        javaExample.setTopic(topic);
        javaExample.setLanguage(ProgrammingLanguage.JAVA);
        javaExample.setTitle("Variables in Java");
        javaExample.setOrderIndex(1);
        javaExample.setCode("""
public class VariablesDemo {
    public static void main(String[] args) {
        // Primitive data types
        int age = 25;
        double salary = 50000.50;
        char grade = 'A';
        boolean isEmployed = true;
        
        // Type conversion
        long bigNumber = age;  // Implicit
        int smallNumber = (int) salary;  // Explicit
        
        System.out.println("Age: " + age);
        System.out.println("Salary: " + salary);
        System.out.println("Grade: " + grade);
        System.out.println("Employed: " + isEmployed);
    }
}
""");
        javaExample.setExplanation("Basic variable declaration and initialization in Java");
        codeExampleRepository.save(javaExample);
        
        // Python Example
        CodeExample pythonExample = new CodeExample();
        pythonExample.setTopic(topic);
        pythonExample.setLanguage(ProgrammingLanguage.PYTHON);
        pythonExample.setTitle("Variables in Python");
        pythonExample.setOrderIndex(2);
        pythonExample.setCode("""
# Python variables (dynamically typed)
age = 25
salary = 50000.50
grade = 'A'
is_employed = True

# Type conversion
big_number = int(age)
small_number = int(salary)

print(f"Age: {age}")
print(f"Salary: {salary}")
print(f"Grade: {grade}")
print(f"Employed: {is_employed}")
""");
        pythonExample.setExplanation("Variable declaration in Python (dynamic typing)");
        codeExampleRepository.save(pythonExample);
        
        // JavaScript Example
        CodeExample jsExample = new CodeExample();
        jsExample.setTopic(topic);
        jsExample.setLanguage(ProgrammingLanguage.JAVASCRIPT);
        jsExample.setTitle("Variables in JavaScript");
        jsExample.setOrderIndex(3);
        jsExample.setCode("""
// JavaScript variables
let age = 25;
let salary = 50000.50;
let grade = 'A';
let isEmployed = true;

// Type conversion
let bigNumber = Number(age);
let smallNumber = parseInt(salary);

console.log(`Age: ${age}`);
console.log(`Salary: ${salary}`);
console.log(`Grade: ${grade}`);
console.log(`Employed: ${isEmployed}`);
""");
        jsExample.setExplanation("Variable declaration in JavaScript (ES6+)");
        codeExampleRepository.save(jsExample);
        
        // C++ Example
        CodeExample cppExample = new CodeExample();
        cppExample.setTopic(topic);
        cppExample.setLanguage(ProgrammingLanguage.CPP);
        cppExample.setTitle("Variables in C++");
        cppExample.setOrderIndex(4);
        cppExample.setCode("""
#include <iostream>
using namespace std;

int main() {
    // Variable declarations
    int age = 25;
    double salary = 50000.50;
    char grade = 'A';
    bool isEmployed = true;
    
    // Type conversion
    long bigNumber = age;
    int smallNumber = static_cast<int>(salary);
    
    cout << "Age: " << age << endl;
    cout << "Salary: " << salary << endl;
    cout << "Grade: " << grade << endl;
    cout << "Employed: " << isEmployed << endl;
    
    return 0;
}
""");
        cppExample.setExplanation("Variable declaration in C++ with static typing");
        codeExampleRepository.save(cppExample);
        
        // Go Example
        CodeExample goExample = new CodeExample();
        goExample.setTopic(topic);
        goExample.setLanguage(ProgrammingLanguage.GO);
        goExample.setTitle("Variables in Go");
        goExample.setOrderIndex(5);
        goExample.setCode("""
package main

import "fmt"

func main() {
    // Variable declarations
    var age int = 25
    var salary float64 = 50000.50
    var grade rune = 'A'
    var isEmployed bool = true
    
    // Short declaration
    name := "John"
    
    // Type conversion
    bigNumber := int64(age)
    smallNumber := int(salary)
    
    fmt.Printf("Age: %d\\n", age)
    fmt.Printf("Salary: %.2f\\n", salary)
    fmt.Printf("Grade: %c\\n", grade)
    fmt.Printf("Employed: %t\\n", isEmployed)
    fmt.Printf("Name: %s\\n", name)
}
""");
        goExample.setExplanation("Variable declaration in Go with type inference");
        codeExampleRepository.save(goExample);
    }
}
