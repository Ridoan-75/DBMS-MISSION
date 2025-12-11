=========================================================================================
                         NORMALIZATION & FUNCTIONAL DEPENDENCY
=========================================================================================

=========================================================================================
# 0. NORMALIZATION কী?
=========================================================================================
Normalization হলো —  
**Database টেবিলকে এমনভাবে সাজানো যাতে Data Redundancy, Inconsistency এবং 
Data Anomalies (Insert, Update, Delete Issues) সম্পূর্ণভাবে দূর হয়।**

Normalization এর মূল উদ্দেশ্য:
✔ Data repetition কমানো  
✔ Insert / Update / Delete anomalies দূর করা  
✔ Efficient & logical table structure তৈরি করা  
✔ Data integrity বজায় রাখা  

Normalization ধাপগুলো:
1) **1NF (First Normal Form)**  
2) **2NF (Second Normal Form)**  
3) **3NF (Third Normal Form)**  
4) **BCNF (Boyce–Codd Normal Form)**  

এই concepts বুঝতে হলে Functional Dependency আগে জানতে হবে।

=========================================================================================
# 1. FUNCTIONAL DEPENDENCY (FD) কী?
=========================================================================================
Functional Dependency মানে হলো:

**একটি attribute আরেকটি attribute-কে uniquely determine করে।**  
অর্থাৎ —  
X → Y মানে X জানলে Y কে ১০০% নিশ্চিতভাবে বের করা যাবে।

Example:
student_id  → student_name  
student_id জানলে student_name নিশ্চিতভাবে পাওয়া যাবে।

This is the foundation of normalization.

=========================================================================================
# 2. FUNCTIONAL DEPENDENCY TYPES
=========================================================================================
Functional Dependency মোট ৪ ধরনের:

###############################################
# 2.1 FULL FUNCTIONAL DEPENDENCY
###############################################
Y সম্পূর্ণভাবে X-এর ওপর depend করে।  
X-এর পুরো কম্বিনেশন না দিলে Y বের করা যায় না।

Example:
(student_id, course_id) → grade  
✔ grade বের করতে দুইটিই লাগবে  
✘ শুধু student_id দিয়ে পাওয়া যাবে না  
✘ শুধু course_id দিয়ে পাওয়া যাবে না

###############################################
# 2.2 PARTIAL DEPENDENCY (2NF violation)
###############################################
Composite key-এর কেবল একটি অংশ দিয়েই dependent attribute নির্ধারিত হয়ে যায়।

Example:
(student_id, course_id) → student_name  
student_name শুধু student_id দিয়েই পাওয়া যায় → এটা partial dependency

###############################################
# 2.3 TRANSITIVE DEPENDENCY (3NF violation)
###############################################
X → Y এবং Y → Z হলে  
X → Z একটি transitive dependency।

Example:
student_id → department  
department → department_head  
student_id → department_head (transitive)

###############################################
# 2.4 TRIVIAL DEPENDENCY
###############################################
যেখানে right side left side-এর subset হয়—

Example:
{student_id, name} → name  
→ trivial

=========================================================================================
# 3. NORMALIZATION STEPS 
=========================================================================================

=========================================================================================
# 3.1 FIRST NORMAL FORM (1NF)
=========================================================================================
Requirement:
✔ Every cell must contain atomic (single) value  
✔ No repeating groups  
✔ No multivalued attributes  

Bad Table:
| student | phone              |
|--------|---------------------|
| Rafi   | 017, 018, 019       |

Violation: multivalued attribute

1NF Solution:
Separate rows:

| student | phone   |
|--------|----------|
| Rafi   | 017      |
| Rafi   | 018      |
| Rafi   | 019      |

=========================================================================================
# 3.2 SECOND NORMAL FORM (2NF)
=========================================================================================
Prerequisite:
✔ Must be in 1NF  
✔ No Partial Dependency  

Rule:
Non-key attribute must depend on **whole** composite key  
—not part of it.

Bad Table Example:
| student_id | course_id | student_name |
(student_id, course_id) → composite PK  
student_name depends only on student_id → partial dependency

2NF Fix:
Split tables:

Students:
| student_id | student_name |

Enrollments:
| student_id | course_id |

=========================================================================================
# 3.3 THIRD NORMAL FORM (3NF)
=========================================================================================
Prerequisite:  
✔ Must be in 2NF  
✔ No Transitive Dependency

Rule:
Non-key attribute cannot depend on another non-key attribute.

Bad Table Example:
| student_id | department | department_head |
student_id → department  
department → department_head  
(student_id) → department_head (transitive)

3NF Fix:
Split tables:

Students:
| student_id | department |

Department:
| department | department_head |

=========================================================================================
# 4. BOYCE–CODD NORMAL FORM (BCNF)
=========================================================================================
Prerequisite:
✔ Stronger version of 3NF  
✔ Every determinant must be a candidate key  

Rule:
যে column অন্য data determine করে (determinant),  
তা অবশ্যই candidate key হতে হবে।

Bad Example:
| teacher | subject | classroom |
teacher → classroom  
subject → teacher  

এখানে:
teacher candidate key নয়  
subject candidate key নয়  
কিন্তু তারা determinant → violates BCNF

BCNF Fix:
Split tables more strictly.

=========================================================================================
# 5. NORMALIZATION SUMMARY TABLE
=========================================================================================
| Normal Form | Requirement |
|-------------|-------------|
| 1NF         | Atomic values, no repeating groups |
| 2NF         | No partial dependency |
| 3NF         | No transitive dependency |
| BCNF        | Determinant must be candidate key |

=========================================================================================
# 6. REAL-LIFE FULL EXAMPLE (A→Z)
=========================================================================================

###############################################
# RAW UNNORMALIZED TABLE (BAD DESIGN)
###############################################
| order_id | customer_name | city | product_name | product_price |

Problems:
✔ product repeat হয় → redundancy  
✔ city repeat → redundancy  
✔ one change affects multiple rows  

###############################################
# AFTER 1NF
###############################################
Atomic values করা হলো → ok

###############################################
# AFTER 2NF
###############################################
Customer separate:
Customers:
| customer_id | customer_name | city |

Orders:
| order_id | customer_id |

###############################################
# AFTER 3NF
###############################################
City separate:
City:
| city_id | city_name |

Customers:
| customer_id | customer_name | city_id |

###############################################
# AFTER BCNF
###############################################
Product separate:
Products:
| product_id | product_name | price |

Order_Items:
| order_id | product_id |

এখন Zero Anomaly Database প্রস্তুত।

=========================================================================================
# 7. WHY NORMALIZATION IS IMPORTANT?
=========================================================================================
✔ Redundancy কমায়  
✔ Storage save করে  
✔ Speed improve করে  
✔ Data consistency রাখে  
✔ Data anomaly (Insert, Update, Delete) prevent করে  
✔ Query লেখা clean হয়  
✔ Database scalable & maintainable হয়  

=========================================================================================
# 8. ONE GLANCE QUICK REVISION (SUPER SHORT)
=========================================================================================
1NF → Repeating groups remove  
2NF → Partial dependency remove  
3NF → Transitive dependency remove  
BCNF → All determinants must be candidate key  

=========================================================================================
                                    THE END
=========================================================================================