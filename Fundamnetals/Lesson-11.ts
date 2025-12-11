=========================================================================================
                         DATA ANOMALIES & TYPES OF ANOMALIES
=========================================================================================

=========================================================================================
# 0. DATA ANOMALY কী?
=========================================================================================
Data Anomaly মানে হলো—  
**Database টেবিল ভুলভাবে ডিজাইন করা হলে Insert, Update, Delete করার সময় যে সমস্যা তৈরি হয়।**

অর্থাৎ—
✔ ভুল ডেটা ঢুকে যায়  
✔ ডেটা বারবার repeat হয়  
✔ একটি ডেটা বদলালে অন্য জায়গায় mismatch হয়  
✔ একটি row delete করলে অন্য দরকারি ডেটাও হারিয়ে যায়  

এই সমস্যাগুলো দূর করতেই মূলত Normalization করা হয়।

DBMS-এ Data Anomaly প্রধানত **৩ ধরনের**:

1) **Insert Anomaly**  
2) **Update Anomaly**  
3) **Delete Anomaly**

এখন প্রতিটাকে A→Z গভীরভাবে শিখবো।

=========================================================================================
# 1. INSERT ANOMALY (ডেটা Insert করার সময় সমস্যা)
=========================================================================================
অর্থ:  
যখন টেবিল এমনভাবে ডিজাইন করা থাকে যে নতুন ডেটা insert করতে গেলে  
**অপ্রয়োজনীয় বা সম্পর্কহীন ডেটাও বাধ্যতামূলক দিতে হয়**, সেটাই Insert Anomaly।

Example Scenario:
ধরি একটি টেবিল—

| student_id | student_name | course_name | instructor |

Problem:
✔ একজন student এখনো কোনো course নেয়নি  
✔ কিন্তু তাকে টেবিলে add করতে গেলে course_name & instructor দেওয়া লাগছে  
✔ অর্থাৎ course ছাড়া student insert করা যাচ্ছে না  

এই design flaw = **Insert Anomaly**

Why it happens?
- এক টেবিলে multiple entities রাখা  
- Redundant data  
- Normalization না থাকা

=========================================================================================
# 2. UPDATE ANOMALY (ডেটা Update করলে mismatch হওয়া)
=========================================================================================
অর্থ:  
যখন একই ডেটা টেবিলে অনেকবার repeat থাকে এবং  
**এক জায়গায় update করলে অন্য জায়গায় update না হলে**  
ডেটা inconsistent হয়ে যায় — এটাই Update Anomaly।

Example:
এক instructor এর নাম অনেক row-তে repeated—

| course  | instructor |
| Math    | Karim Sir |
| Physics | Karim Sir |
| ICT     | Karim Sir |

Problem:
✔ Karim Sir → এখন নাম পরিবর্তন হলো  
✔ কিন্তু ১০টা row থাকলে সব জায়গায় update করতে হবে  
✔ যদি ১টা row miss হয় → ভুল/ভিন্ন ডেটা তৈরি হবে

এটাই Update Anomaly।

মূল কারণ:
- Redundancy
- Single table-এ mixed info রাখা
- 1NF/2NF/3NF follow না করা

=========================================================================================
# 3. DELETE ANOMALY (একটি Row Delete করলে গুরুত্বপূর্ণ data হারিয়ে যাওয়া)
=========================================================================================
অর্থ:  
একটি row delete করলে **দরকারি আরেকটি তথ্যও অনিচ্ছাকৃতভাবে delete হয়ে যাওয়া**  
এই সমস্যাকে Delete Anomaly বলে।

Example:
Table:

| student_name | course_name |
| Rafi         | CSE101      |

Problem:
✔ Rafi এই course drop করলে row delete হবে  
✔ কিন্তু যদি এই এক row-তেই course CSE101 এর তথ্য থাকে  
✔ তাহলে পুরো course সংক্রান্ত তথ্যও হারিয়ে যাবে!

অর্থাৎ unnecessary data loss = Delete Anomaly

কারণ:
- এক table-এ dependent data রাখা  
- Normalization না করা  
- Relationship অনুযায়ী design না করা

=========================================================================================
# 4. কেন Data Anomalies ঘটে?
=========================================================================================
Data anomalies সাধারণত নিচের কারণে হয়—

✔ Redundant data  
✔ Repeating groups  
✔ এক টেবিলে একাধিক entity রাখা  
✔ Proper Primary Key / Foreign Key ডিজাইন না থাকা  
✔ Normalization না করা  
✔ Partial dependency / transitive dependency থাকা  

=========================================================================================
# 5. Data Anomalies দূর করার উপায় — NORMALIZATION
=========================================================================================
Normalization এর উদ্দেশ্য হলো—

✔ Redundancy কমানো  
✔ Data consistency বজায় রাখা  
✔ Insert / Update / Delete anomalies দূর করা  
✔ Logical & clean database structure তৈরি করা  

Normalization Steps:
1) **1NF** → Repeating groups remove করা  
2) **2NF** → Partial dependency remove করা  
3) **3NF** → Transitive dependency remove করা  
4) **BCNF** → Business rule-based correctness নিশ্চিত করা  

=========================================================================================
# 6. REAL-LIFE EXAMPLES (VISUAL UNDERSTANDING)
=========================================================================================

###############################################
# 6.1 INSERT ANOMALY — Real Example  
###############################################
ধরি Student Table:

| student_id | student_name | course | instructor |

✔ New student join করেছে কিন্তু এখনো course enroll করেনি  
✘ তবুও তাকে টেবিলে add করতে course/instructor লাগবে  
→ Design flaw = Insert Anomaly

###############################################
# 6.2 UPDATE ANOMALY — Real Example
###############################################
Restaurant Table:

| item      | price | chef     |
| Burger    | 150   | Rahim    |
| Sandwich  | 120   | Rahim    |

Chef Rahim → নতুন করে “R. Hasan” নাম রাখলো  
✘ সব row update করতে হলো  
✘ একটি row update miss করলে inconsistency

###############################################
# 6.3 DELETE ANOMALY — Real Example
###############################################
| employee   | department |
| Rafi       | HR         |

HR department-এ মাত্র একজন employee  
✘ Rafi resign করলে row delete হবে  
→ HR department তথ্যও delete হয়ে যাবে

=========================================================================================
# 7. ANOMALY-FREE DESIGN — NORMALIZED TABLES
=========================================================================================
Insert, Update এবং Delete anomalies দূর করতে—

✔ Separate entities → separate tables  
✔ Relationship define করা  
✔ FK দিয়ে dependency maintain করা  

Example:
Students Table  
Courses Table  
Instructors Table  

এইভাবে আলাদা করলে redundancy থাকবে না  
→ Anomalies solve হবে

=========================================================================================
# 8. SUMMARY (FAST REVISION)
=========================================================================================
1) **Insert Anomaly**  
   - নতুন data insert করতে গিয়ে অপ্রয়োজনীয় data দিতে হয়

2) **Update Anomaly**  
   - এক ডেটা multiple জায়গায় repeat → mismatch হয়

3) **Delete Anomaly**  
   - এক row delete করতেই অন্য important info হারিয়ে যায়

4) **Solution → Normalization**  
   - 1NF → 2NF → 3NF → BCNF  


=========================================================================================
                                        THE END
=========================================================================================
