import { FileNode } from './types';

function cloneTree(node: FileNode): FileNode {
    return JSON.parse(JSON.stringify(node));
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function getRandomElement<T>(array: T[]): T {
    return array[getRandomInt(array.length)];
}

// Context-aware file name generators
const COMPONENT_NAMES = ['Header', 'Footer', 'Button', 'Modal', 'Card', 'Input', 'Table', 'Sidebar', 'Navbar', 'Dropdown', 'Tooltip', 'Avatar', 'Badge', 'Alert', 'Skeleton'];
const HOOK_NAMES = ['useAuth', 'useTheme', 'useFetch', 'useWindowSize', 'useLocalStorage', 'useDebounce', 'useToggle', 'useOnClickOutside'];
const UTIL_NAMES = ['dateUtils', 'stringHelpers', 'validation', 'formatters', 'apiClient', 'storage', 'constants', 'types', 'mapper'];
const TEST_SUFFIXES = ['.test', '.spec'];
const STYLE_SUFFIXES = ['.module.css', '.scss', '.styled.ts'];

const FOLDER_NAMES = ['components', 'hooks', 'utils', 'services', 'contexts', 'assets', 'styles', 'types', 'config', 'NewFeature', 'OldCode', 'Legacy'];

function getRealisticFileName(parentName: string): string {
    const parent = parentName.toLowerCase();

    if (parent.includes('component') || parent === 'src' || parent.includes('feature')) {
        const base = getRandomElement(COMPONENT_NAMES);
        // 30% chance of being a style file, 20% test, 50% component
        const rand = Math.random();
        if (rand < 0.3) return `${base}${getRandomElement(STYLE_SUFFIXES)}`;
        if (rand < 0.5) return `${base}${getRandomElement(TEST_SUFFIXES)}.tsx`;
        return `${base}.tsx`;
    }

    if (parent.includes('hook') || parent === 'lib') {
        return `${getRandomElement(HOOK_NAMES)}.ts`;
    }

    if (parent.includes('util') || parent.includes('helper') || parent === 'lib') {
        return `${getRandomElement(UTIL_NAMES)}.ts`;
    }

    if (parent.includes('api') || parent.includes('service')) {
        return `${getRandomElement(['user', 'auth', 'product', 'order', 'payment'])}Service.ts`;
    }

    // Default fallback
    const genericFiles = ['setupTests.ts', 'global.d.ts', '.eslintrc.json', 'README.md', 'CHANGELOG.md'];
    return getRandomElement(genericFiles);
}

// Helper to find a random folder in the tree
function getRandomFolder(node: FileNode, candidates: FileNode[] = []) {
    if (node.type === 'folder') {
        candidates.push(node);
        if (node.children) {
            node.children.forEach(child => getRandomFolder(child, candidates));
        }
    }
    return candidates;
}

export function addRandomFile(root: FileNode): FileNode {
    const newRoot = cloneTree(root);
    const folders = getRandomFolder(newRoot);
    if (folders.length === 0) return newRoot;

    // Filter for valid targets
    const validFolders = folders.filter(f => !['node_modules', 'dist', 'build', '.git'].includes(f.name));
    if (validFolders.length === 0) return newRoot;

    const targetFolder = getRandomElement(validFolders);

    // 20% Chance to create a Folder instead of a File
    const createFolder = Math.random() < 0.2;

    if (!targetFolder.children) targetFolder.children = [];

    if (createFolder) {
        let newFolderName = getRandomElement(FOLDER_NAMES);
        // If "NewFeature", append random number
        if (newFolderName === 'NewFeature') {
            newFolderName = `Feature${getRandomInt(100)}`;
        }

        // Avoid dupes
        let finalName = newFolderName;
        let counter = 1;
        while (targetFolder.children.find(c => c.name === finalName)) {
            finalName = `${newFolderName}${counter}`;
            counter++;
        }

        targetFolder.children.push({
            name: finalName,
            type: 'folder',
            isOpen: true,
            children: [{ name: 'index.ts', type: 'file' }] // Pre-populate with index.ts
        });

    } else {
        // Create File
        const newName = getRealisticFileName(targetFolder.name);

        // Check dupes
        let finalName = newName;
        let counter = 1;
        while (targetFolder.children.find(c => c.name === finalName)) {
            finalName = `Copy${counter}_${newName}`;
            counter++;
        }

        targetFolder.children.push({
            name: finalName,
            type: 'file'
        });
    }

    // Sort
    targetFolder.children.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'folder' ? -1 : 1;
    });

    return newRoot;
}

export function deleteRandomFile(root: FileNode): FileNode {
    const newRoot = cloneTree(root);

    const candidates: { parent: FileNode, index: number }[] = [];

    function traverse(node: FileNode) {
        if (node.children) {
            node.children.forEach((child, index) => {
                if (node.name !== 'node_modules') {
                    candidates.push({ parent: node, index });
                }
                traverse(child);
            });
        }
    }

    traverse(newRoot);

    if (candidates.length > 0) {
        const target = getRandomElement(candidates);
        target.parent.children!.splice(target.index, 1);
    }

    return newRoot;
}

export function renameRandomFile(root: FileNode): FileNode {
    const newRoot = cloneTree(root);
    const candidates: FileNode[] = [];

    function traverse(node: FileNode) {
        if (node.children) {
            node.children.forEach(child => {
                // Only rename files for now
                if (child.type === 'file') {
                    candidates.push(child);
                }
                traverse(child);
            });
        }
    }
    traverse(newRoot);

    if (candidates.length > 0) {
        const target = getRandomElement(candidates);
        const nameParts = target.name.split('.');
        const baseName = nameParts[0];
        const ext = nameParts.slice(1).join('.');

        const strategies = [
            () => `${baseName}V2.${ext}`,
            () => `${baseName}.legacy.${ext}`,
            () => `${baseName}.test.${ext}`,
            () => `Use${baseName}.${ext}`,
            () => `_${baseName}.${ext}`,
            () => `${baseName}Controller.${ext}`,
        ];

        target.name = getRandomElement(strategies)();
    }

    return newRoot;
}
