import { FileNode } from './types';

export const REACT_PROJECT_structure: FileNode = {
    name: 'FOO.IO',
    type: 'folder',
    isOpen: true,
    children: [
        {
            name: 'src',
            type: 'folder',
            isOpen: true,
            children: [
                {
                    name: 'components',
                    type: 'folder',
                    children: [
                        { name: 'Button.tsx', type: 'file' },
                        { name: 'Header.tsx', type: 'file' },
                        { name: 'Sidebar.tsx', type: 'file' },
                    ]
                },
                { name: 'App.tsx', type: 'file' },
                { name: 'main.tsx', type: 'file' },
                { name: 'vite-env.d.ts', type: 'file' },
            ]
        },
        {
            name: 'public',
            type: 'folder',
            children: [
                { name: 'favicon.ico', type: 'file' },
                { name: 'robots.txt', type: 'file' },
            ]
        },
        { name: 'package.json', type: 'file' },
        { name: 'tsconfig.json', type: 'file' },
        { name: 'README.md', type: 'file' },
    ]
};

export const NODE_PROJECT_structure: FileNode = {
    name: 'BACKEND-API',
    type: 'folder',
    isOpen: true,
    children: [
        {
            name: 'src',
            type: 'folder',
            isOpen: true,
            children: [
                {
                    name: 'controllers',
                    type: 'folder',
                    children: [
                        { name: 'authController.ts', type: 'file' },
                        { name: 'userController.ts', type: 'file' },
                    ]
                },
                {
                    name: 'models',
                    type: 'folder',
                    children: [
                        { name: 'User.ts', type: 'file' },
                        { name: 'Order.ts', type: 'file' },
                    ]
                },
                { name: 'app.ts', type: 'file' },
                { name: 'server.ts', type: 'file' },
            ]
        },
        { name: '.env', type: 'file' },
        { name: 'package.json', type: 'file' },
        { name: 'docker-compose.yml', type: 'file' },
    ]
};
