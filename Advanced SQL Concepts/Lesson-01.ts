=========================================================================================
                                  SUBQUERY BASICS 
=========================================================================================

=========================================================================================
# 0. Subquery কী?
=========================================================================================
Subquery মানে হলো —
👉 **একটা SQL Query-এর ভিতরে আরেকটা SQL Query**

অর্থাৎ —
👉 **Query-এর ভিতরে Query**

Subquery সাধারণত ব্যবহার হয় যখন —
- এক Query-এর result আরেক Query-তে দরকার হয়
- Step-by-step data filter / calculation করতে হয়
- Complex condition সহজভাবে handle করতে হয়

=========================================================================================
# 1. Subquery কোথায় ব্যবহার করা যায়?
=========================================================================================
Subquery ব্যবহার করা যায়—

1️⃣ SELECT clause এ  
2️⃣ FROM clause এ  
3️⃣ WHERE clause এ  
4️⃣ HAVING clause এ  

=========================================================================================
# 2. Subquery-এর Basic Structure
=========================================================================================

SELECT column_name
FROM table_name
WHERE column_name OPERATOR (
    SELECT column_name
    FROM table_name
    WHERE condition
);

=========================================================================================
# 3. Subquery-এর প্রকারভেদ (Types)
=========================================================================================

-----------------------------------------------------------------------------------------
# 3.1 Scalar Subquery
-----------------------------------------------------------------------------------------
👉 Subquery যদি **একটা মাত্র value return করে**, তখন তাকে Scalar Subquery বলে

Example:
--------
Employee table:
- id
- name
- salary

Goal:
👉 Average salary-এর চেয়ে যাদের salary বেশি

SELECT name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);

✔ Inner query → AVG(salary) → single value  
✔ Outer query → সেই value দিয়ে compare করছে

-----------------------------------------------------------------------------------------
# 3.2 Multiple Row Subquery
-----------------------------------------------------------------------------------------
👉 Subquery যদি **একাধিক row return করে**

এক্ষেত্রে ব্যবহার হয় —
- IN
- ANY
- ALL

Example:
--------
Goal:
👉 IT এবং HR department-এর employee list

SELECT name
FROM employees
WHERE department_id IN (
    SELECT id
    FROM departments
    WHERE name IN ('IT', 'HR')
);

✔ Subquery multiple department_id return করতে পারে  
✔ তাই IN ব্যবহার করা হয়েছে

-----------------------------------------------------------------------------------------
# 3.3 Column Subquery
-----------------------------------------------------------------------------------------
👉 Subquery যদি **একাধিক column return করে**

Example:
--------
SELECT *
FROM employees
WHERE (department_id, salary) IN (
    SELECT department_id, MAX(salary)
    FROM employees
    GROUP BY department_id
);

✔ Subquery → multiple column return করছে

-----------------------------------------------------------------------------------------
# 3.4 Correlated Subquery
-----------------------------------------------------------------------------------------
👉 Subquery যখন **Outer query-এর উপর depend করে**

👉 Inner query একা চলতে পারে না

Example:
--------
Goal:
👉 প্রত্যেক department-এর highest salary employee

SELECT e1.name, e1.salary, e1.department_id
FROM employees e1
WHERE e1.salary = (
    SELECT MAX(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);

✔ Inner query বারবার outer query-এর row অনুযায়ী execute হয়  
✔ এজন্য একে Correlated Subquery বলে

=========================================================================================
# 4. Subquery in SELECT Clause
=========================================================================================

Example:
--------
Goal:
👉 প্রতিটা employee-এর সাথে average salary দেখানো

SELECT 
    name,
    salary,
    (SELECT AVG(salary) FROM employees) AS avg_salary
FROM employees;

✔ Subquery SELECT clause-এর ভিতরে ব্যবহার করা হয়েছে

=========================================================================================
# 5. Subquery in FROM Clause (Derived Table)
=========================================================================================

👉 FROM clause-এ Subquery দিলে তাকে **Derived Table** বলে  
👉 অবশ্যই ALIAS দিতে হবে

Example:
--------
SELECT dept_id, avg_salary
FROM (
    SELECT department_id AS dept_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
) AS dept_avg
WHERE avg_salary > 50000;

=========================================================================================
# 6. Subquery vs JOIN
=========================================================================================

Subquery:
---------
✔ বুঝতে সহজ (logic-wise)
✔ Complex condition handle করা সহজ

JOIN:
-----
✔ Performance ভালো
✔ Large dataset-এ efficient

Rule of Thumb:
--------------
👉 Simple logic → Subquery  
👉 Large data / performance critical → JOIN

=========================================================================================
# 7. Common Operators Used with Subquery
=========================================================================================

=       → Scalar Subquery  
IN      → Multiple rows  
ANY     → যেকোনো একটা match হলেই true  
ALL     → সবগুলোর সাথে condition match করতে হবে  
EXISTS → Subquery result আছে কিনা check করে  

Example (EXISTS):
-----------------
SELECT name
FROM employees e
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.employee_id = e.id
);

✔ EXISTS শুধু existence check করে  
✔ Result data গুরুত্বপূর্ণ না

=========================================================================================
# 8. Subquery-তে Common Mistakes
=========================================================================================

❌ Multiple row return করে কিন্তু = ব্যবহার করা  
❌ FROM clause-এ alias না দেওয়া  
❌ Correlated subquery-তে condition ভুল লেখা  
❌ Unnecessary subquery (JOIN দিয়েই সম্ভব)

=========================================================================================
# 9. Summary (Cheat Sheet)
=========================================================================================

✔ Subquery = Query inside Query  
✔ Scalar → single value  
✔ Multiple Row → IN / ANY / ALL  
✔ Correlated → Outer query-এর উপর depend  
✔ FROM clause → Derived table  
✔ EXISTS → performance-friendly check  

=========================================================================================
                                     THE END
=========================================================================================
