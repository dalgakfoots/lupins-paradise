export const INFINITE_SNIPPETS = [
    `
/**
 * Custom hook for fetching data with retry logic
 */
function useFetchWithRetry<T>(url: string, retries = 3): { data: T | null, error: Error | null } {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let attempts = 0;
        const fetchData = async () => {
            while (attempts < retries) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const json = await response.json();
                    setData(json);
                    return;
                } catch (err) {
                    attempts++;
                    if (attempts >= retries) setError(err as Error);
                }
            }
        };
        fetchData();
    }, [url, retries]);

    return { data, error };
}`,
    `
// Redux Reducer for User State
interface UserState {
    id: string;
    name: string;
    role: 'admin' | 'user' | 'guest';
    preferences: Record<string, any>;
}

const initialState: UserState = {
    id: '',
    name: 'Guest',
    role: 'guest',
    preferences: {}
};

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, ...action.payload };
        case 'UPDATE_PREFERENCES':
            return { 
                ...state, 
                preferences: { ...state.preferences, ...action.payload } 
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};`,
    `
// Advanced Utility Type for recursive partials
type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
        ? RecursivePartial<T[P]>
        : T[P];
};

function mergedConfig<T>(defaultConfig: T, userConfig: RecursivePartial<T>): T {
    // Deep merge implementation omitted for brevity
    return { ...defaultConfig, ...userConfig } as T;
}`,
    `
// Bubble Sort Algorithm implementation
const bubbleSort = (arr: number[]): number[] => {
    const n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
};`,
    `
// Context API Provider wrapper
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
        document.body.classList.toggle('dark-theme');
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};`,
    `
// Service Worker Registration
export function register(config?: Config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = \`\${process.env.PUBLIC_URL}/service-worker.js\`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log('This web app is being served cache-first by a service worker');
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}`,
    `
// GraphQL Query using Apollo Client
const GET_DASHBOARD_DATA = gql\`
  query GetDashboardData($userId: ID!) {
    user(id: $userId) {
      id
      notifications {
        id
        message
        read
      }
      projects(limit: 5) {
        id
        name
        status
        lastUpdated
      }
    }
  }
\`;

export function useDashboard(userId: string) {
    const { loading, error, data } = useQuery(GET_DASHBOARD_DATA, {
        variables: { userId },
        pollInterval: 5000,
    });
    return { loading, error, data };
}`,
    `
// Jest Test Suite for Auth Component
describe('Login Component', () => {
    test('renders login form by default', () => {
        render(<Login />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('shows error on invalid submission', async () => {
        render(<Login />);
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        expect(await screen.findByText(/required/i)).toBeInTheDocument();
    });
});`
];
