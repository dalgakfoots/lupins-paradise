export function generateFileContent(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const name = fileName.split('.')[0];

    // Specific known files
    if (fileName === 'package.json') return generatePackageJson();
    if (fileName === 'tsconfig.json') return generateTsConfig();
    if (fileName === '.gitignore') return generateGitIgnore();

    // Extension based generation
    switch (ext) {
        case 'tsx':
        case 'jsx':
            // Smart Detection based on filename
            if (name.endsWith('Context') || name.endsWith('Provider')) return generateContextTemplate(name);
            if (name.endsWith('Layout')) return generateLayoutTemplate(name);
            if (name.endsWith('Form')) return generateFormTemplate(name);
            if (name.endsWith('List') || name.endsWith('Table')) return generateListTemplate(name);

            // Random Fallback
            const templates = [generateComponentTemplate, generateFormTemplate, generateListTemplate, generateDashboardTemplate];
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            return randomTemplate(name);

        case 'ts':
        case 'js':
            if (name.startsWith('use') && name.length > 3) return generateHookTemplate(name); // Likely a hook
            if (name.endsWith('Slice') || name.endsWith('Reducer')) return generateReduxSlice(name);
            if (name.endsWith('Store')) return generateZustandStore(name);
            if (name.includes('API') || name.includes('Service') || fileName.includes('api/')) return generateApiService(name);
            if (name.endsWith('Types') || name.endsWith('Interface')) return generateTypeDefinition(name);

            // Random Fallback
            const tsTemplates = [generateUtilityTemplate, generateTypeDefinition, generateApiService];
            const randomTsTemplate = tsTemplates[Math.floor(Math.random() * tsTemplates.length)];
            return randomTsTemplate(name);

        case 'css':
        case 'scss':
        case 'less':
            return generateStyleTemplate(name);

        case 'json':
            return generateJsonTemplate(name);

        case 'html':
            return generateHtmlTemplate(name);

        case 'sql':
            return generateSqlTemplate(name);

        case 'yml':
        case 'yaml':
            return generateYamlTemplate(name);

        case 'env':
            return generateEnvTemplate(name);

        case 'md':
            return generateMarkdownTemplate(name);

        default:
            return generateGenericText(fileName);
    }
}

// --- Template Generators ---

function generateComponentTemplate(name: string) {
    return `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ${name}Props {
    title?: string;
    isActive?: boolean;
    children?: React.ReactNode;
}

export const ${name}: React.FC<${name}Props> = ({ title, isActive, children }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        console.log('${name} component mounted');
    }, []);

    if (!isMounted) return null;

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                {title || '${name} Component'}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                This is a simulated React component. It demonstrates the structure 
                typical of a modern web application feature.
            </p>

            {isActive && (
                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    Active Status
                </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                {children || 'No content provided'}
            </div>
            
            <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => console.log('Interaction simulated')}
            >
                Interact
            </button>
        </div>
    );
};

export default ${name};`;
}

function generateContextTemplate(name: string) {
    const contextName = name.replace('Provider', '') + 'Context';
    return `import React, { createContext, useContext, useState, useEffect } from 'react';

interface I${contextName} {
    user: any | null;
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => void;
}

const ${contextName} = createContext<I${contextName} | undefined>(undefined);

export const ${name}: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);

    const login = async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser({ id: '1', name: 'User' });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <${contextName}.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </${contextName}.Provider>
    );
};

export const use${contextName.replace('Context', '')} = () => {
    const context = useContext(${contextName});
    if (!context) {
        throw new Error('use${contextName.replace('Context', '')} must be used within a ${name}');
    }
    return context;
};`;
}

function generateFormTemplate(name: string) {
    return `import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email(),
});

export function ${name}() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 border rounded-md">
            <div>
                <label className="text-sm font-medium">Username</label>
                <Input {...form.register("username")} placeholder="Enter username" />
                {form.formState.errors.username && <span className="text-red-500 text-xs">{form.formState.errors.username.message}</span>}
            </div>
            
            <div>
                 <label className="text-sm font-medium">Email</label>
                 <Input {...form.register("email")} placeholder="email@example.com" />
            </div>

            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}`;
}

function generateLayoutTemplate(name: string) {
    return `import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';

export const ${name} = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800 p-6">
                    <div className="container mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ${name};`;
}

function generateListTemplate(name: string) {
    return `import React, { useMemo } from 'react';
import { Table } from '@/components/ui/table';

interface Item {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    lastActive: string;
}

export const ${name} = () => {
    const data: Item[] = useMemo(() => Array.from({ length: 10 }).map((_, i) => ({
        id: \`id-\${i}\`,
        name: \`Item \${i + 1}\`,
        status: Math.random() > 0.5 ? 'active' : 'inactive',
        lastActive: new Date().toISOString()
    })), []);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Items List</h3>
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded">Filter</button>
            </div>
            <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Last Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{item.id}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">
                                    <span className={\`px-2 py-1 rounded-full text-xs \${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}\`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(item.lastActive).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};`;
}

function generateDashboardTemplate(name: string) {
    return `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Activity, Users, DollarSign } from 'lucide-react';

export default function ${name}() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
            </Card>
        </div>
    );
}`;
}

function generateHookTemplate(name: string) {
    return `import { useState, useEffect, useCallback, useRef } from 'react';

export function ${name}<T>(initialValue: T) {
    const [state, setState] = useState<T>(initialValue);
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    const update = useCallback((newValue: T) => {
        if (isMounted.current) {
            setState(newValue);
        }
    }, []);

    return [state, update] as const;
}`;
}

function generateReduxSlice(name: string) {
    return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ${name}State {
    data: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ${name}State = {
    data: [],
    loading: false,
    error: null,
};

export const ${name}Slice = createSlice({
    name: '${name}',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchStart, fetchSuccess, fetchFailure } = ${name}Slice.actions;
export default ${name}Slice.reducer;`;
}

function generateZustandStore(name: string) {
    return `import { create } from 'zustand';

interface ${name}State {
    bears: number;
    increase: (by: number) => void;
    clear: () => void;
}

export const use${name} = create<${name}State>((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
    clear: () => set({ bears: 0 }),
}));`;
}

function generateApiService(name: string) {
    return `import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ${name} = {
    getAll: async () => {
        const response = await apiClient.get('/${name.toLowerCase()}');
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get(\`/${name.toLowerCase()}/\${id}\`);
        return response.data;
    },

    create: async (data: any) => {
        const response = await apiClient.post('/${name.toLowerCase()}', data);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await apiClient.put(\`/${name.toLowerCase()}/\${id}\`, data);
        return response.data;
    },

    delete: async (id: string) => {
        await apiClient.delete(\`/${name.toLowerCase()}/\${id}\`);
    },
};`;
}

function generateTypeDefinition(name: string) {
    const interfaceName = 'I' + name.charAt(0).toUpperCase() + name.slice(1);
    return `// Type definitions for ${name}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface ${interfaceName} {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    metadata: Record<string, unknown>;
}

export interface ${name}Response {
    data: ${interfaceName}[];
    total: number;
    page: number;
}

export type ${name}Callback = (result: ${interfaceName}) => void;`;
}

function generateUtilityTemplate(name: string) {
    return `/**
 * Utility: ${name}
 * Generated by Lupin's Paradise Engine
 */

export const ${name.toUpperCase()}_TIMEOUT = 5000;
export const MAX_RETRIES = 3;

export function format${name}(input: string): string {
    return input.trim().toLowerCase().replace(/\\s+/g, '-');
}

export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};`;
}

function generatePackageJson() {
    return `{
  "name": "lupins-paradise",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "13.4.7",
    "framer-motion": "^10.0.0",
    "zustand": "^4.3.8",
    "lucide-react": "^0.244.0"
  },
  "devDependencies": {
    "@types/node": "20.3.1",
    "@types/react": "18.2.14",
    "typescript": "5.1.3",
    "tailwindcss": "3.3.2"
  }
}`;
}

function generateTsConfig() {
    return `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;
}

function generateGitIgnore() {
    return `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
ts-debug.log*`;
}

function generateStyleTemplate(name: string) {
    return `/* Styles for ${name} */

.${name.toLowerCase()}-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.${name.toLowerCase()}-header {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    letter-spacing: -0.025em;
}

.${name.toLowerCase()}-content {
    width: 100%;
    max-width: 600px;
}

@media (max-width: 768px) {
    .${name.toLowerCase()}-root {
        padding: 1rem;
    }
}
`;
}

function generateJsonTemplate(name: string) {
    return `{
    "name": "${name}",
    "private": true,
    "metadata": {
        "createdAt": "${new Date().toISOString()}",
        "updatedAt": "${new Date().toISOString()}",
        "tags": ["simulation", "mock", "data"]
    },
    "config": {
        "enabled": true,
        "theme": "dark",
        "retryCount": 3
    },
    "features": [
        "authentication",
        "real-time-updates",
        "data-visualization"
    ]
}`;
}

function generateHtmlTemplate(name: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <meta name="description" content="Generated HTML for ${name}">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="root">
        <header>
            <h1>${name}</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <section class="hero">
                <p>Welcome to the ${name} page.</p>
                <button id="cta-button">Click Me</button>
            </section>
        </main>
        <footer>
            <p>&copy; ${new Date().getFullYear()} Lupin's Paradise</p>
        </footer>
    </div>
    <script src="main.js"></script>
</body>
</html>`;
}

function generateSqlTemplate(name: string) {
    return `-- Schema for ${name}
-- Generated automatically

CREATE TABLE IF NOT EXISTS ${name}s (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_${name}_status ON ${name}s(status);
CREATE INDEX idx_${name}_user_id ON ${name}s(user_id);

-- Insert seed data
INSERT INTO ${name}s (title, description, status) VALUES 
('Initial Item', 'Created by system', 'active'),
('Test Item', 'For debugging', 'archived');
`;
}

function generateYamlTemplate(name: string) {
    return `# Configuration for ${name}

version: "3.8"

services:
  ${name}:
    image: node:18-alpine
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - API_KEY=\${API_KEY}
    volumes:
      - ./data:/app/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
`;
}

function generateEnvTemplate(name: string) {
    return `# Environment Variables for ${name}
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/${name}_db
JWT_SECRET=super-secret-key-change-me
REDIS_URL=redis://localhost:6379
API_KEY=sk_test_1234567890abcdef
FEATURE_FLAG_NEW_UI=true
`;
}

function generateMarkdownTemplate(name: string) {
    return `# ${name}

## Overview
This document describes the **${name}** module. It is part of the core infrastructure simulating the developer environment.

## Features
- Scalable architecture
- Secure default configuration
- High performance

## Getting Started

### Prerequisites
- Node.js >= 18
- Docker

### Installation
\`\`\`bash
npm install @lupin/${name.toLowerCase()}
\`\`\`

## API Reference
Refer to the [Swagger Documentation](http://localhost:3000/docs) for detailed API endpoints.

## License
MIT
`;
}

function generateGenericText(fileName: string) {
    return `// ${fileName}
// 
// This file format is not explicitly supported by the previewer.
// Showing raw text representation.
// 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
`;
}
