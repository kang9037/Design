/**
 * Supabase 클라이언트 초기화 및 인증 관리
 */

// Supabase 클라이언트 초기화
const supabaseUrl = 'https://llzglaqgytiebtdzixal.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsemdsYXFneXRpZWJ0ZHppeGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxODMzOTEsImV4cCI6MjA3NTc1OTM5MX0.xJoBuLDG-hoOQcngBThihoFRbq4hh5fceg6KPDYgr0A';

// Supabase 클라이언트 생성
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

/**
 * 인증 관리 클래스
 */
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.initializeAuth();
    }

    /**
     * 인증 상태 초기화 및 모니터링
     */
    async initializeAuth() {
        // 현재 세션 확인
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            this.currentUser = session.user;
            await this.loadUserProfile();
        }

        // 인증 상태 변경 감지
        supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);
            if (session) {
                this.currentUser = session.user;
                await this.loadUserProfile();
            } else {
                this.currentUser = null;
            }
        });
    }

    /**
     * 사용자 프로필 로드
     */
    async loadUserProfile() {
        if (!this.currentUser) return null;

        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', this.currentUser.id)
                .single();

            if (error) {
                // 테이블이 없으면 user_metadata에서 정보 가져오기
                console.warn('프로필 테이블 없음, user_metadata 사용:', error.message);
                return {
                    id: this.currentUser.id,
                    user_type: this.currentUser.user_metadata?.user_type || 'student',
                    full_name: this.currentUser.user_metadata?.full_name || '',
                    email: this.currentUser.email
                };
            }
            return data;
        } catch (error) {
            console.error('프로필 로드 실패:', error.message);
            // 에러 시에도 기본 정보 반환
            return {
                id: this.currentUser.id,
                user_type: this.currentUser.user_metadata?.user_type || 'student',
                full_name: this.currentUser.user_metadata?.full_name || '',
                email: this.currentUser.email
            };
        }
    }

    /**
     * 회원가입
     * @param {string} email - 아이디 (이메일 형식으로 변환)
     * @param {string} password - 비밀번호
     * @param {object} metadata - 추가 사용자 정보
     */
    async signUp(email, password, metadata = {}) {
        try {
            // 이메일 형식으로 변환 (Supabase는 이메일 형식 필수)
            const emailFormatted = email.includes('@') ? email : `${email}@studycare.local`;

            // 비밀번호가 6자 미만이면 자동으로 패딩 추가 (Supabase 최소 요구사항)
            const paddedPassword = password.length < 6 ? password.padEnd(6, '0') : password;

            const { data, error } = await supabase.auth.signUp({
                email: emailFormatted,
                password: paddedPassword,
                options: {
                    data: {
                        ...metadata,
                        original_username: email // 원본 아이디 저장
                    },
                    emailRedirectTo: undefined // 이메일 인증 비활성화
                }
            });

            if (error) throw error;

            return {
                success: true,
                user: data.user,
                message: '회원가입이 완료되었습니다.'
            };
        } catch (error) {
            console.error('회원가입 실패:', error);
            return {
                success: false,
                error: error.message,
                message: this.getErrorMessage(error.message)
            };
        }
    }

    /**
     * 로그인
     * @param {string} email - 아이디 (이메일 형식으로 변환)
     * @param {string} password - 비밀번호
     */
    async signIn(email, password) {
        try {
            // 이메일 형식으로 변환
            const emailFormatted = email.includes('@') ? email : `${email}@studycare.local`;

            // 비밀번호가 6자 미만이면 자동으로 패딩 추가
            const paddedPassword = password.length < 6 ? password.padEnd(6, '0') : password;

            const { data, error } = await supabase.auth.signInWithPassword({
                email: emailFormatted,
                password: paddedPassword
            });

            if (error) throw error;

            this.currentUser = data.user;
            return {
                success: true,
                user: data.user,
                session: data.session,
                message: '로그인되었습니다.'
            };
        } catch (error) {
            console.error('로그인 실패:', error);
            return {
                success: false,
                error: error.message,
                message: this.getErrorMessage(error.message)
            };
        }
    }

    /**
     * 로그아웃
     */
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            this.currentUser = null;
            return {
                success: true,
                message: '로그아웃되었습니다.'
            };
        } catch (error) {
            console.error('로그아웃 실패:', error);
            return {
                success: false,
                error: error.message,
                message: '로그아웃에 실패했습니다.'
            };
        }
    }

    /**
     * 비밀번호 재설정 이메일 전송
     * @param {string} email - 이메일
     */
    async resetPassword(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password.html'
            });

            if (error) throw error;

            return {
                success: true,
                message: '비밀번호 재설정 링크가 이메일로 전송되었습니다.'
            };
        } catch (error) {
            console.error('비밀번호 재설정 실패:', error);
            return {
                success: false,
                error: error.message,
                message: '비밀번호 재설정에 실패했습니다.'
            };
        }
    }

    /**
     * 비밀번호 업데이트
     * @param {string} newPassword - 새 비밀번호
     */
    async updatePassword(newPassword) {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            return {
                success: true,
                message: '비밀번호가 변경되었습니다.'
            };
        } catch (error) {
            console.error('비밀번호 변경 실패:', error);
            return {
                success: false,
                error: error.message,
                message: '비밀번호 변경에 실패했습니다.'
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
     * 에러 메시지 한글화
     */
    getErrorMessage(errorMessage) {
        const errorMap = {
            'Invalid login credentials': '아이디 또는 비밀번호가 올바르지 않습니다.',
            'Email not confirmed': '이메일 인증이 완료되지 않았습니다.',
            'User already registered': '이미 가입된 아이디입니다.',
            'Password should be at least 6 characters': '비밀번호는 최소 4자 이상이어야 합니다.',
            'Unable to validate email address': '유효하지 않은 아이디입니다.',
            'Email rate limit exceeded': '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
            'Signup requires a valid password': '비밀번호는 최소 4자 이상이어야 합니다.'
        };

        return errorMap[errorMessage] || '오류가 발생했습니다. 다시 시도해주세요.';
    }
}

/**
 * 데이터베이스 관리 클래스
 */
class DatabaseManager {
    constructor(authManager) {
        this.authManager = authManager;
    }

    /**
     * 사용자 프로필 업데이트
     */
    async updateProfile(updates) {
        const user = this.authManager.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .update(updates)
                .eq('id', user.id)
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('프로필 업데이트 실패:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 학습 세션 추가
     */
    async addStudySession(sessionData) {
        const user = this.authManager.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const { data, error } = await supabase
                .from('study_sessions')
                .insert({
                    user_id: user.id,
                    ...sessionData
                })
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('학습 세션 추가 실패:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 학습 세션 목록 조회
     */
    async getStudySessions(limit = 10) {
        const user = this.authManager.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const { data, error } = await supabase
                .from('study_sessions')
                .select('*')
                .eq('user_id', user.id)
                .order('start_time', { ascending: false })
                .limit(limit);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('학습 세션 조회 실패:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 성적 추가
     */
    async addGrade(gradeData) {
        const user = this.authManager.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const { data, error } = await supabase
                .from('grades')
                .insert({
                    user_id: user.id,
                    ...gradeData
                })
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('성적 추가 실패:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 성적 목록 조회
     */
    async getGrades(limit = 10) {
        const user = this.authManager.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const { data, error } = await supabase
                .from('grades')
                .select('*')
                .eq('user_id', user.id)
                .order('exam_date', { ascending: false })
                .limit(limit);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('성적 조회 실패:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 목표 추가
     */
    async addGoal(goalData) {
        const user = this.authManager.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const { data, error } = await supabase
                .from('goals')
                .insert({
                    user_id: user.id,
                    ...goalData
                })
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('목표 추가 실패:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 목표 목록 조회
     */
    async getGoals(status = 'active') {
        const user = this.authManager.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            let query = supabase
                .from('goals')
                .select('*')
                .eq('user_id', user.id);

            if (status) {
                query = query.eq('status', status);
            }

            const { data, error } = await query.order('created_at', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('목표 조회 실패:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 과제 추가
     */
    async addTask(taskData) {
        const user = this.authManager.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert({
                    user_id: user.id,
                    ...taskData
                })
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('과제 추가 실패:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 과제 목록 조회
     */
    async getTasks(status = null) {
        const user = this.authManager.getCurrentUser();
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            let query = supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user.id);

            if (status) {
                query = query.eq('status', status);
            }

            const { data, error } = await query.order('due_date', { ascending: true });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('과제 조회 실패:', error);
            return { success: false, error: error.message };
        }
    }
}

// 전역 인스턴스 생성
const authManager = new AuthManager();
const dbManager = new DatabaseManager(authManager);

// 전역 객체로 노출
window.authManager = authManager;
window.dbManager = dbManager;
window.supabaseClient = supabase;
