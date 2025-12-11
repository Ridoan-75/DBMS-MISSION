=========================================================================================
                RELATIONSHIP CARDINALITY & ER DIAGRAMS 
=========================================================================================

=========================================================================================
# 0. RELATIONSHIP CARDINALITY কী?
=========================================================================================
Cardinality মানে হলো—  
**এক Entity-এর সাথে অন্য Entity-এর সম্পর্ক কতটা?**  
অথবা  
**একদিকে কয়টা instance অন্যদিকের কয়টা instance-এর সাথে সম্পর্ক করতে পারে?**

এই Cardinality বুঝলেই তুমি ER Diagram সঠিকভাবে ডিজাইন করতে পারবে।

Cardinality মূলত ৩ ধরণের:

1) **One-to-One (1:1)**
2) **One-to-Many (1:N)**
3) **Many-to-Many (M:N)**

এখন প্রতিটা গভীরভাবে শিখবো।

=========================================================================================
# 1. ONE-TO-ONE RELATIONSHIP (1:1)
=========================================================================================
অর্থ:  
এক Entity-এর একটি Row শুধুমাত্র অন্য Entity-এর একটি Row এর সাথে সম্পর্কিত।

Example:  
- একজন মানুষ (Person) এর একটি করে Passport থাকে  
- একটি কোম্পানির একজন কর্মীর জন্য একটি Work-Profile থাকে  

Diagram Conceptually:

Person 1 --- 1 Passport

**ER Diagram Notation (Crow’s Foot):**

[Person] ────||────||──── [Passport]  
(দুই পাশে Double-bar → One-to-One)

**Database Design Approach:**
One-to-One হলে সাধারণত—
- দুটি Table এর মধ্যে যেকোনো একটিতে Foreign Key রাখা যায়  
- অথবা দুটি Table আলাদা রাখা যায় security/performance কারণে

=========================================================================================
# 2. ONE-TO-MANY RELATIONSHIP (1:N)
=========================================================================================
অর্থ:  
এক Entity → অনেকগুলা instance  
অন্য Entity → প্রতিটা instance শুধু একটার সাথেই সম্পর্কিত

Example:
- এক Department এ অনেক Employee থাকতে পারে  
- স্টুডেন্টের অনেক Address থাকতে পারে (যদি আলাদা টেবিল হয়)  

Diagram:

Department 1 --- N Employee

**Crow’s Foot Notation:**

[Department] ────||────< { [Employee]  
(এক পাশে Double-bar → One  
অন্য পাশে Crow-foot → Many)

**Database Design Approach:**
- Child table এ Foreign Key দেওয়া হয়  
- Example: employees.department_id → departments.id

=========================================================================================
# 3. MANY-TO-MANY RELATIONSHIP (M:N)
=========================================================================================
অর্থ:  
এক Entity-এর অনেক instance →  
অন্য Entity-এর অনেক instance এর সাথে সম্পর্ক করতে পারে

Example:
- একজন Student অনেক Course নিতে পারে  
- একটি Course অনেক Student নিতে পারে  

Diagram:

Student M --- N Course

**Crow’s Foot:**

[Student] ────< {  >───> [Course]

**Database Design Approach:**
Direct Many-to-Many relational database এ রাখা যায় না।  
একটি **bridge/association table** তৈরি করতে হয়।

Example:
- enrollments (student_id, course_id)

=========================================================================================
# 4. ER DIAGRAM কী?
=========================================================================================
ER Diagram (Entity–Relationship Diagram) হলো একটা Blueprint বা Map,  
যেখানে দেখানো হয়—

✔ Entity  
✔ Attribute  
✔ Relationship  
✔ Cardinality  

ER Diagram এর Parts:

1) **Entity (Rectangle)**  
2) **Attribute (Oval)**  
3) **Primary Key (Underlined)**  
4) **Relationship (Diamond Shape)**  
5) **Cardinality Symbols** (1, N, M)  

=========================================================================================
# 5. ER DIAGRAM COMPONENTS (A → Z DETAIL)
=========================================================================================

###############################################
# 5.1 Entity
###############################################
Entity মানে Database এ যেগুলোকে টেবিলে রূপান্তর করা হবে।

Example:
Student, Course, Teacher, Product, Order ইত্যাদি।

###############################################
# 5.2 Attribute
###############################################
Entity এর property বা বৈশিষ্ট্য।

Example:
Student → id, name, email, age

###############################################
# 5.3 Primary Key (PK)
###############################################
প্রতিটি Row কে uniquely identify করার জন্য column।

Example:
student.id

###############################################
# 5.4 Relationship
###############################################
Entity গুলোর মধ্যে কেমন সম্পর্ক আছে তা দেখায়।

###############################################
# 5.5 Cardinality
###############################################
ERD তে Cardinality সবচেয়ে গুরুত্বপূর্ণ অংশ।

৩টি Symbol:

1 — এক  
N বা M — অনেক  

Crow’s Foot Diagramে:

|| = One  
< { = Many  

=========================================================================================
# 6. CARDINALITY WITH REAL EXAMPLES 
=========================================================================================

###############################################
# 6.1 ONE-TO-ONE (1:1)
###############################################
Person (1) → Passport (1)

ER Notation:
Person ||——|| Passport

###############################################
# 6.2 ONE-TO-MANY (1:N)
###############################################
Category (1) → Product (many)

ER:
Category ||——< { Product

###############################################
# 6.3 MANY-TO-MANY (M:N)
###############################################
Student (many) → Course (many)

ER:
Student < {——> } > Course

Bridge Table:
Enrollment(student_id, course_id)

=========================================================================================
# 7. COMPLETE ER DIAGRAM EXAMPLE (STUDENT MANAGEMENT)
=========================================================================================

Entities:
- Student(id, name, email)  
- Course(id, title, credit)  
- Enrollment(id, student_id, course_id, grade)

Relationship:
- Student M:N Course  
- Enrollment = Associative Entity  

Crow's Foot ERD (Text Form):

(1) Student  
        id (PK)  
        name  
        email  

            | < { Enrollment } > |  

(2) Enrollment  
        id (PK)  
        student_id (FK)  
        course_id (FK)  
        grade  

            | > } Course { < |  

(3) Course  
        id (PK)  
        title  
        credit  

=========================================================================================
# 8. CARDINALITY নির্ধারণ করার নিয়ম
=========================================================================================

✔ Step 1: Requirement পড়ো  
✔ Step 2: Entity বের করো  
✔ Step 3: বাস্তবে সম্পর্কটা কেমন তা চিন্তা করো  
✔ Step 4: Many side always gets the Foreign Key  
✔ Step 5: যদি M:N হয় → Bridge Table বানাও  

Example:
“একটি Order এ অনেক Product থাকতে পারে  
এবং একটি Product অনেক Order এ থাকতে পারে”

Solution:
order_items টেবিল তৈরি করো (order_id, product_id)

=========================================================================================
# 9. SUMMARY (দ্রুত মনে রাখার ট্রিক)
=========================================================================================

1) **One-to-One (1:1)**
   - Unique সম্পর্ক  
   - FK যেকোনো পাশে রাখা যায়

2) **One-to-Many (1:N)**
   - Parent → Child  
   - FK child টেবিলে

3) **Many-to-Many (M:N)**
   - Bridge table আবশ্যক  
   - Direct FK দেওয়া যায় না

=========================================================================================
# 10. চাইলে আমি তোমাকে যেকোনো ব্যবসার জন্য Full ERD A→Z করে দিতে পারি
=========================================================================================
তুমি শুধু বলো—  
**কোন Business বা Project এর ER Diagram চাও?**

যেমন:
✔ Ecommerce  
✔ Hospital  
✔ Rental System  
✔ Banking  
✔ Social Media  
✔ Library Management  
✔ School/University LMS  

আমি সম্পূর্ণ A→Z Diagram + Tables + Relationships তোমার format এ বানিয়ে দেব।


=========================================================================================
                                      THE END
=========================================================================================