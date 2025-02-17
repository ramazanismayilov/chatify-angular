export const initialState = {
    isDarkMode: false,
    mainLayout: 'app',
    theme: 'light',
    menu: 'vertical',
    layout: 'full',
    rtlClass: 'ltr',
    animation: '',
    navbar: 'navbar-sticky',
    locale: 'en',
    sidebar: false,
    isShowMainLoader: true,
    semidark: false,
    languageList: [
        { code: 'az', name: 'Azerbaijan' },
        { code: 'en', name: 'English' },
        { code: 'ru', name: 'Russian' },
        { code: 'tr', name: 'Turkish' },
    ]
};

export function indexReducer(state = initialState, action: any) {
    const type = action.type;
    let payload = action.payload;
    if (type === 'toggleDirection') {
        localStorage.setItem('direction', payload);
        document.querySelector('html')?.setAttribute('dir', payload || 'ltr');
        return { ...state, ...{ direction: payload } };
    } else if (type === 'toggleMainLoader') {
        return { ...state, ...{ isShowMainLoader: payload } };
    }

    if (type === 'setMainLayout') {
        return { ...state, ...{ mainLayout: payload } };
    } else if (type === 'toggleTheme') {
        payload = payload || state.theme;
        localStorage.setItem('theme', payload);
        let isDarkMode = state.isDarkMode || false;
        if (payload == 'light') {
            isDarkMode = false;
        } else if (payload == 'dark') {
            isDarkMode = true;
        } else if (payload == 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                isDarkMode = true;
            } else {
                isDarkMode = false;
            }
        }

        if (isDarkMode) {
            document.querySelector('body')?.classList.add('dark');
        } else {
            document.querySelector('body')?.classList.remove('dark');
        }
        return { ...state, ...{ theme: payload, isDarkMode: isDarkMode } };
    } else if (type === 'toggleMenu') {
        payload = payload || state.menu;
        localStorage.setItem('menu', payload);
        return { ...state, ...{ sidebar: false, menu: payload } };
    } else if (type === 'toggleLayout') {
        payload = payload || state.layout;
        localStorage.setItem('layout', payload);
        return { ...state, ...{ layout: payload } };
    } else if (type === 'toggleRTL') {
        payload = payload || state.rtlClass;
        localStorage.setItem('rtlClass', payload);
        const rtlClass = payload;
        document.querySelector('html')?.setAttribute('dir', rtlClass || 'ltr');
        return { ...state, ...{ rtlClass: rtlClass } };
    } else if (type === 'toggleAnimation') {
        payload = payload;
        payload = payload?.trim();
        localStorage.setItem('animation', payload);
        if (payload) {
            const eleanimation: any = document.querySelector('.animation');
            eleanimation?.classList.add('animate__animated');
            eleanimation?.classList.add(payload);
        }
        return { ...state, ...{ animation: payload } };
    } else if (type === 'toggleNavbar') {
        payload = payload || state.navbar;
        localStorage.setItem('navbar', payload);
        return { ...state, ...{ navbar: payload } };
    } else if (type === 'toggleSemidark') {
        payload = payload || false;
        localStorage.setItem('semidark', payload);
        return { ...state, ...{ semidark: payload } };
    } else if (type === 'toggleLocale') {
        payload = payload || state.locale;
        localStorage.setItem('i18n_locale', payload);
        return { ...state, ...{ locale: payload } };
    } else if (type === 'toggleSidebar') {
        return { ...state, ...{ sidebar: !state.sidebar } };
    }

    return state;
}
