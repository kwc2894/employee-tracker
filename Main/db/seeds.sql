INSERT INTO department (id, name)
VALUES (1, "Software Engineering"),
       (2, "Finance"),
       (3, "Marketing"),
       (4, "Fancy people"),
       (5, "Intern");
       (6, "Janitor");
       (7, "Head Hanchos")

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Chief executive of putting stuff in code", "50.0", 1),
       (2, "Chief executive of putting stuff in code", "50.0", 2),
       (3, "Chief executive of putting stuff in code", "50.0", 3),
       (4, "Chief executive of putting stuff in code", "50.0", 4),
       (5, "Chief executive of putting stuff in code", "50.0", 5),
       (6, "Chief executive of putting stuff in code", "50.0", 6),
       (7, "Chief executive of putting stuff in code", "50.0", 7),

INSERT INTO employee ( id, first_name,last_name, role_id, manager_id)
VALUES (1, "jerk", "man",  1, 50),
       (2, "nice", "guy",  2, 20),
       (3, "person", "mkperson",  1, 20),
       (4, "super", "person" 5, 30),
       (5, "why", "bye" 6, 10),
       (6, "video game", "weeeeee" 6, 10),
       (7, "mr", "weewee" 6, 10),
       
