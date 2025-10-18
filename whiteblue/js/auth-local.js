/**
 * 로컬 스토리지 기반 인증 시스템
 * 외부 서비스 의존성 없이 브라우저에서 동작
 */

class LocalAuthManager {
    constructor() {
        this.currentUser = null;
        this.storageKey = 'studycare_users';
        this.sessionKey = 'studycare_session';
        this.initializeAuth();
    }

    /**
     * 인증 시스템 초기화
     */
    initializeAuth() {
        // 기존 사용자 데이터 로드
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }

        // 세션 확인
        const sessionData = sessionStorage.getItem(this.sessionKey);
        if (sessionData) {
            try {
                this.currentUser = JSON.parse(sessionData);
            } catch (e) {
                console.error('세션 데이터 로드 실패:', e);
                sessionStorage.removeItem(this.sessionKey);
            }
        }
    }

    /**
     * 사용자 데이터 가져오기
     */
    getUsers() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || [];
        } catch (e) {
            console.error('사용자 데이터 로드 실패:', e);
            return [];
        }
    }

    /**
     * 사용자 데이터 저장
     */
    saveUsers(users) {
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    /**
     * 회원가입
     */
    async signUp(username, password, metadata = {}) {
        try {
            const users = this.getUsers();

            // 중복 아이디 체크
            if (users.find(u => u.username === username)) {
                return {
                    success: false,
                    message: '이미 사용중인 아이디입니다.'
                };
            }

            // 새 사용자 생성
            const newUser = {
                id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                username: username,
                password: btoa(password), // 간단한 인코딩 (실제로는 더 강력한 암호화 필요)
                metadata: {
                    ...metadata,
                    created_at: new Date().toISOString()
                }
            };

            users.push(newUser);
            this.saveUsers(users);

            return {
                success: true,
                user: { id: newUser.id, username: newUser.username, ...newUser.metadata },
                message: '회원가입이 완료되었습니다.'
            };
        } catch (error) {
            console.error('회원가입 실패:', error);
            return {
                success: false,
                message: '회원가입 중 오류가 발생했습니다.'
            };
        }
    }

    /**
     * 로그인
     */
    async signIn(username, password) {
        try {
            const users = this.getUsers();
            const user = users.find(u => u.username === username);

            if (!user) {
                return {
                    success: false,
                    message: '아이디 또는 비밀번호가 올바르지 않습니다.'
                };
            }

            // 비밀번호 확인
            if (user.password !== btoa(password)) {
                return {
                    success: false,
                    message: '아이디 또는 비밀번호가 올바르지 않습니다.'
                };
            }

            // 세션 생성
            const sessionUser = {
                id: user.id,
                username: user.username,
                ...user.metadata
            };

            this.currentUser = sessionUser;
            sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionUser));

            // 로그인 기록 업데이트
            user.metadata.last_login = new Date().toISOString();
            this.saveUsers(users);

            return {
                success: true,
                user: sessionUser,
                message: '로그인되었습니다.'
            };
        } catch (error) {
            console.error('로그인 실패:', error);
            return {
                success: false,
                message: '로그인 중 오류가 발생했습니다.'
            };
        }
    }

    /**
     * 로그아웃
     */
    async signOut() {
        try {
            this.currentUser = null;
            sessionStorage.removeItem(this.sessionKey);
            return {
                success: true,
                message: '로그아웃되었습니다.'
            };
        } catch (error) {
            console.error('로그아웃 실패:', error);
            return {
                success: false,
                message: '로그아웃 중 오류가 발생했습니다.'
            };
        }
    }

    /**
     * 비밀번호 변경
     */
    async updatePassword(username, oldPassword, newPassword) {
        try {
            const users = this.getUsers();
            const userIndex = users.findIndex(u => u.username === username);

            if (userIndex === -1) {
                return {
                    success: false,
                    message: '사용자를 찾을 수 없습니다.'
                };
            }

            const user = users[userIndex];

            // 기존 비밀번호 확인
            if (user.password !== btoa(oldPassword)) {
                return {
                    success: false,
                    message: '현재 비밀번호가 올바르지 않습니다.'
                };
            }

            // 새 비밀번호 저장
            user.password = btoa(newPassword);
            user.metadata.password_updated_at = new Date().toISOString();
            this.saveUsers(users);

            return {
                success: true,
                message: '비밀번호가 변경되었습니다.'
            };
        } catch (error) {
            console.error('비밀번호 변경 실패:', error);
            return {
                success: false,
                message: '비밀번호 변경 중 오류가 발생했습니다.'
            };
        }
    }

    /**
     * 현재 로그인된 사용자 확인
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * 로그인 상태 확인
     */
    isLoggedIn() {
        return this.currentUser !== null;
    }

    /**
     * 사용자 프로필 업데이트
     */
    async updateProfile(userId, updates) {
        try {
            const users = this.getUsers();
            const userIndex = users.findIndex(u => u.id === userId);

            if (userIndex === -1) {
                return {
                    success: false,
                    message: '사용자를 찾을 수 없습니다.'
                };
            }

            // 메타데이터 업데이트
            users[userIndex].metadata = {
                ...users[userIndex].metadata,
                ...updates,
                updated_at: new Date().toISOString()
            };

            this.saveUsers(users);

            // 현재 세션 업데이트
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser = {
                    ...this.currentUser,
                    ...updates
                };
                sessionStorage.setItem(this.sessionKey, JSON.stringify(this.currentUser));
            }

            return {
                success: true,
                data: users[userIndex].metadata,
                message: '프로필이 업데이트되었습니다.'
            };
        } catch (error) {
            console.error('프로필 업데이트 실패:', error);
            return {
                success: false,
                message: '프로필 업데이트 중 오류가 발생했습니다.'
            };
        }
    }

    /**
     * 사용자 삭제 (회원 탈퇴)
     */
    async deleteUser(userId, password) {
        try {
            const users = this.getUsers();
            const userIndex = users.findIndex(u => u.id === userId);

            if (userIndex === -1) {
                return {
                    success: false,
                    message: '사용자를 찾을 수 없습니다.'
                };
            }

            // 비밀번호 확인
            if (users[userIndex].password !== btoa(password)) {
                return {
                    success: false,
                    message: '비밀번호가 올바르지 않습니다.'
                };
            }

            // 사용자 삭제
            users.splice(userIndex, 1);
            this.saveUsers(users);

            // 로그아웃
            if (this.currentUser && this.currentUser.id === userId) {
                await this.signOut();
            }

            return {
                success: true,
                message: '회원 탈퇴가 완료되었습니다.'
            };
        } catch (error) {
            console.error('회원 탈퇴 실패:', error);
            return {
                success: false,
                message: '회원 탈퇴 중 오류가 발생했습니다.'
            };
        }
    }
}

/**
 * 로컬 데이터 관리 클래스
 */
class LocalDataManager {
    constructor(authManager) {
        this.authManager = authManager;
        this.dataPrefix = 'studycare_data_';
    }

    /**
     * 데이터 키 생성
     */
    getDataKey(type, userId) {
        return `${this.dataPrefix}${type}_${userId}`;
    }

    /**
     * 데이터 저장
     */
    saveData(type, data) {
        const user = this.authManager.getCurrentUser();
        if (!user) {
            return { success: false, message: '로그인이 필요합니다.' };
        }

        try {
            const key = this.getDataKey(type, user.id);
            const existingData = this.getData(type).data || [];

            const newItem = {
                ...data,
                id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                user_id: user.id,
                created_at: new Date().toISOString()
            };

            existingData.push(newItem);
            localStorage.setItem(key, JSON.stringify(existingData));

            return { success: true, data: newItem };
        } catch (error) {
            console.error('데이터 저장 실패:', error);
            return { success: false, message: '데이터 저장 중 오류가 발생했습니다.' };
        }
    }

    /**
     * 데이터 조회
     */
    getData(type, limit = null) {
        const user = this.authManager.getCurrentUser();
        if (!user) {
            return { success: false, message: '로그인이 필요합니다.' };
        }

        try {
            const key = this.getDataKey(type, user.id);
            const data = JSON.parse(localStorage.getItem(key) || '[]');

            // 최신순 정렬
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            // 개수 제한
            const limitedData = limit ? data.slice(0, limit) : data;

            return { success: true, data: limitedData };
        } catch (error) {
            console.error('데이터 조회 실패:', error);
            return { success: false, message: '데이터 조회 중 오류가 발생했습니다.' };
        }
    }

    /**
     * 데이터 업데이트
     */
    updateData(type, id, updates) {
        const user = this.authManager.getCurrentUser();
        if (!user) {
            return { success: false, message: '로그인이 필요합니다.' };
        }

        try {
            const key = this.getDataKey(type, user.id);
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            const itemIndex = data.findIndex(item => item.id === id);

            if (itemIndex === -1) {
                return { success: false, message: '데이터를 찾을 수 없습니다.' };
            }

            data[itemIndex] = {
                ...data[itemIndex],
                ...updates,
                updated_at: new Date().toISOString()
            };

            localStorage.setItem(key, JSON.stringify(data));
            return { success: true, data: data[itemIndex] };
        } catch (error) {
            console.error('데이터 업데이트 실패:', error);
            return { success: false, message: '데이터 업데이트 중 오류가 발생했습니다.' };
        }
    }

    /**
     * 데이터 삭제
     */
    deleteData(type, id) {
        const user = this.authManager.getCurrentUser();
        if (!user) {
            return { success: false, message: '로그인이 필요합니다.' };
        }

        try {
            const key = this.getDataKey(type, user.id);
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            const filteredData = data.filter(item => item.id !== id);

            localStorage.setItem(key, JSON.stringify(filteredData));
            return { success: true, message: '삭제되었습니다.' };
        } catch (error) {
            console.error('데이터 삭제 실패:', error);
            return { success: false, message: '데이터 삭제 중 오류가 발생했습니다.' };
        }
    }

    // 편의 메서드들
    addStudySession(sessionData) {
        return this.saveData('study_sessions', sessionData);
    }

    getStudySessions(limit = 10) {
        return this.getData('study_sessions', limit);
    }

    addGrade(gradeData) {
        return this.saveData('grades', gradeData);
    }

    getGrades(limit = 10) {
        return this.getData('grades', limit);
    }

    addGoal(goalData) {
        return this.saveData('goals', goalData);
    }

    getGoals() {
        return this.getData('goals');
    }

    addTask(taskData) {
        return this.saveData('tasks', taskData);
    }

    getTasks() {
        return this.getData('tasks');
    }
}

// 전역 인스턴스 생성
const authManager = new LocalAuthManager();
const dataManager = new LocalDataManager(authManager);

// 전역 객체로 노출 (기존 코드와의 호환성)
window.authManager = authManager;
window.dbManager = dataManager;

// 테스트 계정 자동 생성 (개발용)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const testUsers = authManager.getUsers();
    if (testUsers.length === 0) {
        authManager.signUp('test', 'test', {
            user_type: 'student',
            full_name: '테스트 학생',
            phone: '010-1234-5678',
            school_name: '테스트고등학교',
            grade: 2,
            class_number: 3
        });
        console.log('테스트 계정 생성됨 - ID: test, PW: test');
    }
}