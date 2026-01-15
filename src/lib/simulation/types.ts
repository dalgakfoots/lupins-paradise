export interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    isOpen?: boolean; // Initial open state for folders
}
