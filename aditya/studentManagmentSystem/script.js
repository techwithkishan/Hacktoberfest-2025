
        // Sample initial data
        let students = JSON.parse(localStorage.getItem('students')) || [
            {
                id: 'S001',
                name: 'John Smith',
                email: 'john.smith@example.com',
                phone: '123-456-7890',
                course: 'Computer Science',
                grade: 85.5,
                status: 'Active'
            },
            {
                id: 'S002',
                name: 'Emily Johnson',
                email: 'emily.johnson@example.com',
                phone: '123-456-7891',
                course: 'Mathematics',
                grade: 92.0,
                status: 'Active'
            },
            {
                id: 'S003',
                name: 'Michael Brown',
                email: 'michael.brown@example.com',
                phone: '123-456-7892',
                course: 'Physics',
                grade: 78.5,
                status: 'Inactive'
            }
        ];

        // DOM elements
        const studentForm = document.getElementById('studentForm');
        const formTitle = document.getElementById('formTitle');
        const studentDataForm = document.getElementById('studentDataForm');
        const studentsTableBody = document.getElementById('studentsTableBody');
        const addStudentBtn = document.getElementById('addStudentBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const messageDiv = document.getElementById('message');
        const totalStudentsEl = document.getElementById('totalStudents');
        const activeStudentsEl = document.getElementById('activeStudents');
        const averageGradeEl = document.getElementById('averageGrade');

        // Form fields
        const studentIdField = document.getElementById('studentId');
        const fullNameField = document.getElementById('fullName');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const courseField = document.getElementById('course');
        const gradeField = document.getElementById('grade');
        const statusField = document.getElementById('status');

        // Current student being edited
        let currentStudentId = null;

        // Initialize the application
        function init() {
            renderStudentsTable();
            updateDashboard();
            addEventListeners();
        }

        // Add event listeners
        function addEventListeners() {
            addStudentBtn.addEventListener('click', showAddForm);
            cancelBtn.addEventListener('click', hideForm);
            studentDataForm.addEventListener('submit', handleFormSubmit);
            searchBtn.addEventListener('click', handleSearch);
            searchInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    handleSearch();
                }
            });
        }

        // Show the add student form
        function showAddForm() {
            formTitle.textContent = 'Add New Student';
            studentDataForm.reset();
            currentStudentId = null;
            studentForm.style.display = 'block';
            studentIdField.removeAttribute('readonly');
        }

        // Show the edit student form
        function showEditForm(studentId) {
            const student = students.find(s => s.id === studentId);
            if (!student) return;

            formTitle.textContent = 'Edit Student';
            studentIdField.value = student.id;
            fullNameField.value = student.name;
            emailField.value = student.email;
            phoneField.value = student.phone;
            courseField.value = student.course;
            gradeField.value = student.grade;
            statusField.value = student.status;
            
            studentIdField.setAttribute('readonly', 'true');
            currentStudentId = studentId;
            studentForm.style.display = 'block';
        }

        // Hide the form
        function hideForm() {
            studentForm.style.display = 'none';
            currentStudentId = null;
        }

        // Handle form submission
        function handleFormSubmit(event) {
            event.preventDefault();
            
            const studentData = {
                id: studentIdField.value,
                name: fullNameField.value,
                email: emailField.value,
                phone: phoneField.value,
                course: courseField.value,
                grade: parseFloat(gradeField.value),
                status: statusField.value
            };

            if (currentStudentId) {
                // Update existing student
                updateStudent(currentStudentId, studentData);
            } else {
                // Add new student
                addStudent(studentData);
            }
        }

        // Add a new student
        function addStudent(studentData) {
            // Check if student ID already exists
            if (students.some(s => s.id === studentData.id)) {
                showMessage('Student ID already exists!', 'error');
                return;
            }

            students.push(studentData);
            saveToLocalStorage();
            renderStudentsTable();
            updateDashboard();
            hideForm();
            showMessage('Student added successfully!', 'success');
        }

        // Update an existing student
        function updateStudent(studentId, studentData) {
            const index = students.findIndex(s => s.id === studentId);
            if (index !== -1) {
                students[index] = studentData;
                saveToLocalStorage();
                renderStudentsTable();
                updateDashboard();
                hideForm();
                showMessage('Student updated successfully!', 'success');
            }
        }

        // Delete a student
        function deleteStudent(studentId) {
            if (confirm('Are you sure you want to delete this student?')) {
                students = students.filter(s => s.id !== studentId);
                saveToLocalStorage();
                renderStudentsTable();
                updateDashboard();
                showMessage('Student deleted successfully!', 'success');
            }
        }

        // Render the students table
        function renderStudentsTable(filteredStudents = null) {
            const studentsToRender = filteredStudents || students;
            studentsTableBody.innerHTML = '';

            if (studentsToRender.length === 0) {
                studentsTableBody.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center;">No students found</td>
                    </tr>
                `;
                return;
            }

            studentsToRender.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.course}</td>
                    <td>${student.grade}</td>
                    <td>${student.status}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn edit-btn" onclick="showEditForm('${student.id}')">Edit</button>
                            <button class="action-btn delete-btn" onclick="deleteStudent('${student.id}')">Delete</button>
                        </div>
                    </td>
                `;
                studentsTableBody.appendChild(row);
            });
        }

        // Handle search
        function handleSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                renderStudentsTable();
                return;
            }

            const filteredStudents = students.filter(student => 
                student.id.toLowerCase().includes(searchTerm) ||
                student.name.toLowerCase().includes(searchTerm) ||
                student.course.toLowerCase().includes(searchTerm)
            );

            renderStudentsTable(filteredStudents);
        }

        // Update dashboard statistics
        function updateDashboard() {
            totalStudentsEl.textContent = students.length;
            
            const activeStudents = students.filter(s => s.status === 'Active').length;
            activeStudentsEl.textContent = activeStudents;
            
            if (students.length > 0) {
                const totalGrade = students.reduce((sum, student) => sum + student.grade, 0);
                const averageGrade = totalGrade / students.length;
                averageGradeEl.textContent = averageGrade.toFixed(1);
            } else {
                averageGradeEl.textContent = '0.0';
            }
        }

        // Show message
        function showMessage(text, type) {
            messageDiv.textContent = text;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        }

        // Save to localStorage
        function saveToLocalStorage() {
            localStorage.setItem('students', JSON.stringify(students));
        }

        // Initialize the application
        init();