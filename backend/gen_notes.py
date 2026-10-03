from pathlib import Path
from fpdf import FPDF

OUT = Path(__file__).parent / "notes"
OUT.mkdir(exist_ok=True)

NOTES = {
"DBMS": [
("Normalization", "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It works by dividing large tables into smaller related tables and defining relationships between them. The goal is to avoid insertion, update and deletion anomalies."),
("Anomalies", "An insertion anomaly happens when we cannot add data without adding unrelated data. An update anomaly happens when the same fact is stored in many rows and changing it in one row leaves the others inconsistent. A deletion anomaly happens when deleting one fact accidentally removes another useful fact."),
("First Normal Form (1NF)", "A table is in 1NF if every column holds atomic (indivisible) values and there are no repeating groups. For example, a column storing 'Math, Physics' for a student violates 1NF. Fix it by creating one row per subject."),
("Second Normal Form (2NF)", "A table is in 2NF if it is in 1NF and every non-key attribute depends on the whole primary key, not just part of it. Partial dependency only occurs with composite keys. To fix it, move the partially dependent attributes into a separate table."),
("Third Normal Form (3NF)", "A table is in 3NF if it is in 2NF and no non-key attribute depends on another non-key attribute. This removes transitive dependency. Example: if StudentID -> DeptID and DeptID -> DeptName, then DeptName should move to a Department table."),
("BCNF", "Boyce-Codd Normal Form is a stricter version of 3NF. A table is in BCNF if for every functional dependency X -> Y, X is a super key. BCNF removes the remaining anomalies caused by overlapping candidate keys."),
("Transactions and ACID", "A transaction is a unit of work that must be completed fully or not at all. ACID stands for Atomicity, Consistency, Isolation and Durability. Atomicity means all or nothing. Consistency means the database moves from one valid state to another. Isolation means concurrent transactions do not interfere. Durability means committed data survives crashes."),
],
"CN": [
("TCP", "TCP is a connection-oriented, reliable transport protocol. It uses a three-way handshake (SYN, SYN-ACK, ACK), sequence numbers, acknowledgements and retransmission. It also provides flow control and congestion control. It is used for web, email and file transfer."),
("UDP", "UDP is a connectionless, unreliable transport protocol. It has no handshake, no retransmission and no ordering guarantee, so it is faster and has less overhead. It is used for video streaming, DNS and online games."),
("OSI Model", "The OSI model has seven layers: Physical, Data Link, Network, Transport, Session, Presentation and Application. Each layer provides services to the layer above and uses services of the layer below."),
],
"DAA": [
("Dijkstra's Algorithm", "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a graph with non-negative edge weights. It keeps a distance array, repeatedly picks the unvisited vertex with the smallest distance, and relaxes its outgoing edges. With a min-heap its time complexity is O((V + E) log V)."),
("Merge Sort", "Merge sort is a divide and conquer algorithm. It splits the array into halves, sorts each half recursively and merges the sorted halves. Time complexity is O(n log n) in all cases and it needs O(n) extra space."),
("Dynamic Programming", "Dynamic programming solves problems with overlapping subproblems and optimal substructure by storing results of subproblems. Examples are the knapsack problem, longest common subsequence and Fibonacci numbers."),
],
}

for name, sections in NOTES.items():
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 12, f"{name} Notes", new_x="LMARGIN", new_y="NEXT")
    for title, body in sections:
        pdf.set_font("Helvetica", "B", 13)
        pdf.multi_cell(0, 9, title, new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Helvetica", "", 11)
        pdf.multi_cell(0, 7, body, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(3)
    pdf.output(str(OUT / f"{name}.pdf"))

(OUT / "Python.txt").write_text(
"Python Notes\n\n"
"A list is a mutable ordered collection written with square brackets. A tuple is immutable and written with parentheses.\n"
"A dictionary stores key-value pairs and gives fast lookup by key.\n"
"A decorator is a function that wraps another function to add behavior without changing its code.\n"
"A generator uses yield to produce values lazily, one at a time, which saves memory.\n"
"List comprehension is a short way to build lists: [x*x for x in range(5)].\n",
encoding="utf-8")

print("Created sample notes in", OUT)
