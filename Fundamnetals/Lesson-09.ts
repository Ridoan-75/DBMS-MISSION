=========================================================================================
                     DATABASE DESIGN PROCESS — STEP BY STEP 
=========================================================================================

=========================================================================================
# 0. DATABASE DESIGN PROCESS কি?
=========================================================================================
Database Design Process হলো—
একটি সু-গঠনযুক্ত পদ্ধতি যার মাধ্যমে কোনো অ্যাপ্লিকেশন বা সিস্টেমের জন্য  
**efficient, scalable, consistent এবং error-free** database তৈরি করা হয়।

এই Process মোটামুটি ৭টি ধাপে সম্পন্ন হয়:

1) Requirement Analysis  
2) Conceptual Design (ER Diagram)  
3) Logical Design (Relational Model)  
4) Normalization  
5) Physical Design (Table, Data Types, Constraints)  
6) Implementation (SQL তৈরি ও রান করা)  
7) Testing & Optimization  

এখন আমরা একে একে Step-By-Step শিখবো।

=========================================================================================
# 1. REQUIREMENT ANALYSIS (সবকিছুর ভিত্তি)
=========================================================================================
এই পর্যায়ে তুমি প্রথমে বুঝবে—

✔ সিস্টেমটি কী কাজ করবে  
✔ ইউজার কারা  
✔ তারা কী কী ডেটা ব্যবহার করবে  
✔ ডেটাগুলোর মধ্যে সম্পর্ক কেমন  

**Example — “Student Management System”**
- স্টুডেন্ট থাকবে  
- কোর্স থাকবে  
- স্টুডেন্ট কোর্স নিতে পারবে  
- স্টুডেন্টের রেজাল্ট থাকবে  

এগুলো জানলেই তুমি Entity 및 Attribute গুলো বের করতে পারবে।

**Entity Examples:**  
- Student  
- Course  
- Enrollment  

**Attribute Examples:**  
- Student → id, name, email, phone  
- Course → id, title, credit  
- Enrollment → id, student_id, course_id, grade  

=========================================================================================
# 2. CONCEPTUAL DESIGN (ER DIAGRAM তৈরি)
=========================================================================================
এই স্টেপে Entity গুলোর সম্পর্ক (relationships) define করা হয়।

সাধারণত তিন প্রকারের Relationship থাকে:

1) **One-to-One (1:1)**  
2) **One-to-Many (1:N)**  
3) **Many-to-Many (M:N)**

**আমাদের Example:**
- একজন Student একাধিক Course নিতে পারে → (1:N নয়, এখানে M:N)
- অনেক Student অনেক Course নিতে পারে → M:N  
- তাই মাঝে Enrollment নামের Associative Entity লাগবে।

**ER Diagram Representation:**

Student ---< Enrollment >--- Course

এখন আমরা Logical Modeling এ যাবো।

=========================================================================================
# 3. LOGICAL DESIGN (RELATIONAL MODEL তৈরি)
=========================================================================================
ER Diagram কে রূপান্তর করা হয় Table এ।

আমাদের Example Tables:

1) **students**
   - id (PK)
   - name
   - email (Unique)
   - phone

2) **courses**
   - id (PK)
   - title
   - credit

3) **enrollments**
   - id (PK)
   - student_id (FK → students.id)
   - course_id (FK → courses.id)
   - grade

এখানেই primary key / foreign key স্পষ্ট define করা হয়।

=========================================================================================
# 4. NORMALIZATION (ডেটা Duplicate কমানো)
=========================================================================================
Normalization হলো রুল বা ফর্ম (NF) যার মাধ্যমে Database এর Quality বাড়ানো হয়।

সবচেয়ে Common Normal Forms:

1) **1NF** →  
   - টেবিলে শুধুমাত্র atomic value থাকবে  
   - কোনো repeating group থাকবে না  

2) **2NF** →  
   - 1NF satisfied  
   - partial dependency থাকবে না (composite key হলে)  

3) **3NF** →  
   - 2NF satisfied  
   - কোনো transitive dependency থাকবে না  

**আমাদের Example Already 3NF Compliant**, কারণ—
- কোনো repeated column নেই  
- সব attributes সরাসরি primary key-এর উপর নির্ভরশীল  

Normalization শেষ মানেই Database clean, scalable & consistent।

=========================================================================================
# 5. PHYSICAL DESIGN (TABLE CREATION)
=========================================================================================
এবার ঠিক করো—

✔ কোন data type ব্যবহার করবে  
✔ কোন column index করবে  
✔ কোন constraint লাগবে  

**Example Physical Design (PostgreSQL schema):**

students(id SERIAL PRIMARY KEY, name VARCHAR, email VARCHAR UNIQUE, phone VARCHAR)
courses(id SERIAL PRIMARY KEY, title VARCHAR, credit INT)
enrollments(id SERIAL PRIMARY KEY, student_id INT REFERENCES students(id), course_id INT REFERENCES courses(id), grade VARCHAR)

=========================================================================================
# 6. IMPLEMENTATION (SQL দিয়ে DATABASE তৈরি)
=========================================================================================
**Example SQL (PostgreSQL):**

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  credit INT
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id),
  grade VARCHAR(5)
);

=========================================================================================
# 7. TESTING & OPTIMIZATION
=========================================================================================
Database তৈরি হয়ে গেলে test করতে হবে—

✔ Insert / Update / Delete এর সময় কোনো constraint error হয় কিনা  
✔ Relationship ঠিকমতো কাজ করছে কিনা  
✔ Query গুলো fast কিনা  
✔ Index লাগবে কিনা  

**Optimization Examples:**
- Frequently searched column এ INDEX  
- Composite index  
- Query optimization  
- Partitioning (Large DB হলে)  

=========================================================================================
# SUMMARY 
=========================================================================================
DATABASE DESIGN PROCESS (A → Z):

1) Requirement Analysis  
2) Conceptual Design (ER Model)  
3) Logical Design (Relational Model)  
4) Normalization  
5) Physical Design  
6) Implementation (SQL)  
7) Testing & Optimization  

=========================================================================================
                                     THE END
=========================================================================================