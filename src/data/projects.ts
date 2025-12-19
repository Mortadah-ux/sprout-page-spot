import type { Project } from '@/types';
import mitreAttackImage from '@/assets/mitre-attack-framework.png';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Splunk SOC Home Lab',
    category: 'siem',
    year: '2024',
    slug: 'splunk-soc-home-lab',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Installed and configured Splunk Free Edition to ingest and analyse Windows event logs. Used SPL to investigate security events and build dashboards and alerts. Simulated real SOC monitoring and detection workflows.',
    tools: 'Splunk Free Edition, SPL, Windows Event Logs',
    platform: 'Home Lab',
    location: 'Personal Project',
    images: [
      {
        id: '1-1',
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Server rack with networking equipment',
        aspectRatio: 'landscape'
      },
      {
        id: '1-2',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Security monitoring dashboard',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '2',
    title: 'Windows Event Log Analysis (Sysmon)',
    category: 'threat-hunting',
    year: '2024',
    slug: 'windows-sysmon-analysis',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Deployed Microsoft Sysmon for enhanced endpoint logging. Analysed process creation, network connections, and file modifications. Practised identifying suspicious behaviour and writing incident summaries.',
    tools: 'Microsoft Sysmon, Windows Event Viewer, PowerShell',
    platform: 'Windows Environment',
    location: 'Personal Project',
    images: [
      {
        id: '2-1',
        src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Data analytics dashboard',
        aspectRatio: 'landscape'
      },
      {
        id: '2-2',
        src: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Code analysis on screen',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '3',
    title: 'Azure Cloud Security Fundamentals',
    category: 'labs',
    year: '2024',
    slug: 'azure-cloud-security',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Completed hands-on labs focused on identity and access management. Gained practical experience with RBAC (Role-Based Access Control) and Azure monitoring features through Microsoft Learn labs.',
    tools: 'Azure Portal, Azure AD, RBAC, Azure Monitor',
    platform: 'Microsoft Learn Labs',
    location: 'Cloud Environment',
    images: [
      {
        id: '3-1',
        src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Cloud infrastructure visualization',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '4',
    title: 'TryHackMe SOC Training',
    category: 'labs',
    year: '2024',
    slug: 'tryhackme-soc-training',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Regular practice on TryHackMe SOC and detection paths, developing practical skills in threat detection, log analysis, and incident response through hands-on challenges and labs.',
    tools: 'TryHackMe Platform, Various Security Tools',
    platform: 'TryHackMe',
    location: 'Online Training',
    images: [
      {
        id: '4-1',
        src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Cybersecurity learning platform',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '5',
    title: 'Network Analysis with Wireshark',
    category: 'network-security',
    year: '2024',
    slug: 'wireshark-network-analysis',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Hands-on practice with Wireshark and Nmap for network traffic analysis and vulnerability scanning. Understanding TCP/IP protocols, DNS, firewall configurations, and VPN fundamentals.',
    tools: 'Wireshark, Nmap, tcpdump',
    platform: 'Home Lab',
    location: 'Personal Project',
    images: [
      {
        id: '5-1',
        src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Network traffic visualization',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '6',
    title: 'Google Cybersecurity Certificate Labs',
    category: 'labs',
    year: '2024',
    slug: 'google-cybersecurity-labs',
    coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Completed comprehensive hands-on labs as part of the Google Cybersecurity Professional Certificate, covering security fundamentals, threat detection, and incident response procedures.',
    tools: 'Linux, SQL, Python, SIEM Tools',
    platform: 'Google Career Certificates',
    location: 'Online Learning',
    images: [
      {
        id: '6-1',
        src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Programming and security analysis',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '7',
    title: 'MITRE ATT&CK Framework Study',
    category: 'threat-hunting',
    year: '2024',
    slug: 'mitre-attack-study',
    coverImage: mitreAttackImage,
    description: 'Self-study of the MITRE ATT&CK framework for understanding adversary tactics, techniques, and procedures. Using this knowledge to improve threat detection and incident analysis capabilities.',
    tools: 'MITRE ATT&CK Navigator, Splunk Security Essentials',
    platform: 'Self-Study',
    location: 'Professional Development',
    images: [
      {
        id: '7-1',
        src: mitreAttackImage,
        alt: 'MITRE ATT&CK Framework - PRE-ATT&CK and ATT&CK Kill Chain',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '8',
    title: 'Python Security Scripting',
    category: 'labs',
    year: '2024',
    slug: 'python-security-scripting',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Learning Python scripting for security automation tasks, including log parsing, data analysis, and basic security tool development to enhance SOC efficiency.',
    tools: 'Python, Regular Expressions, APIs',
    platform: 'GitHub',
    location: 'Personal Project',
    images: [
      {
        id: '8-1',
        src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Python code on screen',
        aspectRatio: 'landscape'
      }
    ]
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
