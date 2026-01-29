import axios from "axios";
import React, { useState, useEffect, useRef, createContext, useContext } from "react";


/**
 * Test.tsx
 * Một file demo nhỏ gồm vài đoạn React + TypeScript:
 * - Counter (useState)
 * - TodoList (state với kiểu)
 * - FetchUsers (useEffect)
 * - ControlledForm (useRef + form)
 * - ThemeContext (Context API)
 * - useLocalStorage (custom hook)
 */

/* ---------------- Custom Hook: useLocalStorage ---------------- */
function useLocalStorage<T>(key: string, initial: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as T) : initial;
        } catch {
            return initial;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch {}
    }, [key, state]);

    return [state, setState] as const;
}

/* ---------------- Theme Context ---------------- */
const ThemeContext = createContext({
    dark: false,
    toggle: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [dark, setDark] = useLocalStorage<boolean>("demo-theme-dark", false);
    const toggle = () => setDark((d) => !d);
    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

/* ---------------- Counter ---------------- */
function Counter() {
    const [count, setCount] = useState<number>(0);
    return (
        <section style={boxStyle}>
            <h3>Counter</h3>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => setCount((c) => c - 1)}>-</button>
                <strong>{count}</strong>
                <button onClick={() => setCount((c) => c + 1)}>+</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
        </section>
    );
}

/* ---------------- Todo List ---------------- */
type Todo = { id: string; text: string; done: boolean };

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: "1", text: "Learn React", done: false },
    ]);
    const [text, setText] = useState("");

    const add = () => {
        if (!text.trim()) return;
        setTodos((t) => [
            ...t,
            { id: Date.now().toString(), text: text.trim(), done: false },
        ]);
        setText("");
    };

    const toggle = (id: string) =>
        setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

    const remove = (id: string) => setTodos((t) => t.filter((x) => x.id !== id));

    return (
        <section style={boxStyle}>
            <h3>Todo List</h3>
            <div style={{ display: "flex", gap: 8 }}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="New todo..."
                />
                <button onClick={add}>Add</button>
            </div>
            <ul>
                {todos.map((t) => (
                    <li key={t.id} style={{ marginTop: 8 }}>
                        <label style={{ textDecoration: t.done ? "line-through" : "none" }}>
                            <input
                                type="checkbox"
                                checked={t.done}
                                onChange={() => toggle(t.id)}
                            />{" "}
                            {t.text}
                        </label>
                        <button onClick={() => remove(t.id)} style={{ marginLeft: 8 }}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

/* ---------------- Fetch Users (useEffect) ---------------- */
function FetchUsers() {
    const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((r) => r.json())
            .then((data) => {
                if (!cancelled) setUsers(data.slice(0, 5).map((u: any) => ({ id: u.id, name: u.name })));
            })
            .catch(() => {
                if (!cancelled) setUsers([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <section style={boxStyle}>
            <h3>Fetch Users (demo)</h3>
            {loading ? <div>Loading...</div> : null}
            <ul>
                {users.map((u) => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
        </section>
    );
}

/* ---------------- Controlled Form + useRef ---------------- */
function ControlledForm() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState("");
    const submit = (e?: React.FormEvent) => {
        e?.preventDefault();
        alert("Submitted: " + value);
        setValue("");
        inputRef.current?.focus();
    };
    return (
        <section style={boxStyle}>
            <h3>Controlled Form</h3>
            <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type something..."
                />
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

/* ---------------- Theme Consumer ---------------- */
function ThemeDemo() {
    const { dark, toggle } = useContext(ThemeContext);
    return (
        <section style={{ ...boxStyle, background: dark ? "#222" : "#fafafa", color: dark ? "#fff" : "#000" }}>
            <h3>Theme Context</h3>
            <div>Current: {dark ? "Dark" : "Light"}</div>
            <button onClick={toggle} style={{ marginTop: 8 }}>
                Toggle
            </button>
        </section>
    );
}

function AxiosClientDemo() {
    // Tránh gọi API 2 lần do React.StrictMode (dev) bằng cách
    // - dùng ref để chỉ thực hiện 1 lần
    // - và dùng AbortController để hủy request khi component unmount
    const calledRef = useRef(false);

    useEffect(() => {
        if (calledRef.current) return; // nếu đã gọi thì bỏ qua
        calledRef.current = true;

        console.log('Axios Client Demo: bắt đầu gọi api');

        // const controller = new AbortController();

        axios
            .get('http://localhost:8088/api/v1/categories', {
                params: { page: 1, limit: 100 },
                headers: {
                    accept: '*/*',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzI3MDMwODkyIiwiaWF0IjoxNzY1NTk5MjkyLCJleHAiOjE3NjU4NTg0OTJ9.1BfxzdCyG8C1yN1lSL7U57fFgVejk1H_oAr2kpRkchg',
                },
                // axios hỗ trợ signal (v0.22+); dùng để abort request
                // signal: controller.signal,
            })
            .then((response) => {
                console.log('Axios Client Demo: Response data:', response.data);
            })
            .catch((error) => {
                // Nếu bị abort / cancel thì không log lỗi spam
                try {
                    // axios.isCancel(error) trả true nếu request bị hủy bằng cancel token
                    if ((axios as any).isCancel && (axios as any).isCancel(error)) return;
                } catch {}
                if ((error as any)?.name === 'CanceledError') return; // axios v0.27+ sử dụng CanceledError
                console.error('Error fetching data:', error);
            });

        return () => {
            // hủy request khi unmount
            try {
                // controller.abort();
            } catch {}
        };
    }, []);

    return (
        <section style={boxStyle}>
            <h3>Axios Client Demo</h3>
            <div>Check console for fetched data.</div>
        </section>
    );
}

/* ---------------- Layout + Exported Component ---------------- */
const boxStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
};

export default function Test() {
    return (
        <ThemeProvider>
            <div style={{ maxWidth: 760, margin: "16px auto", fontFamily: "Arial, sans-serif" }}>
                <h2>React Demo Snippets</h2>
                <p style={{ color: "#666" }}>Một vài ví dụ nhỏ để bắt đầu với React + TypeScript</p>
                <Counter />
                <TodoList />
                <FetchUsers />
                <AxiosClientDemo /> 
                <ControlledForm />
                <ThemeDemo />
            </div>
        </ThemeProvider>
    );
}