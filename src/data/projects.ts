import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Home SOC Lab',
    category: 'labs',
    year: '2024',
    slug: 'home-soc-lab',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Built a comprehensive home security operations lab using VirtualBox, featuring a complete SIEM stack with Splunk, vulnerable machines for testing, and automated log collection from Windows and Linux endpoints.',
    tools: 'Splunk, VirtualBox, pfSense, Windows Server, Ubuntu',
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
        src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Network monitoring dashboard',
        aspectRatio: 'landscape'
      },
      {
        id: '1-3',
        src: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Security operations center setup',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '2',
    title: 'Splunk SIEM Detection Rules',
    category: 'siem',
    year: '2024',
    slug: 'splunk-detection-rules',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Developed custom Splunk detection rules and dashboards to identify common attack patterns including brute force attempts, suspicious PowerShell execution, and lateral movement indicators.',
    tools: 'Splunk, SPL, MITRE ATT&CK Framework',
    platform: 'Splunk Enterprise',
    location: 'Home Lab',
    images: [
      {
        id: '2-1',
        src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Data analytics dashboard',
        aspectRatio: 'landscape'
      },
      {
        id: '2-2',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Security monitoring interface',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '3',
    title: 'Malware Analysis: Emotet Sample',
    category: 'malware-analysis',
    year: '2024',
    slug: 'emotet-malware-analysis',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Conducted static and dynamic analysis of an Emotet malware sample in an isolated sandbox environment. Documented IOCs, network behavior, persistence mechanisms, and created detection signatures.',
    tools: 'REMnux, Ghidra, Wireshark, Process Monitor, VirusTotal',
    platform: 'Isolated VM Lab',
    location: 'Personal Research',
    images: [
      {
        id: '3-1',
        src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Matrix-style code visualization',
        aspectRatio: 'landscape'
      },
      {
        id: '3-2',
        src: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Code analysis on screen',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '4',
    title: 'Network Traffic Analysis',
    category: 'network-security',
    year: '2024',
    slug: 'network-traffic-analysis',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Analyzed PCAP files from CTF challenges and real-world scenarios to identify malicious traffic patterns, data exfiltration attempts, and command & control communications.',
    tools: 'Wireshark, Zeek, NetworkMiner, tcpdump',
    platform: 'TryHackMe / HackTheBox',
    location: 'CTF Challenges',
    images: [
      {
        id: '4-1',
        src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Network visualization',
        aspectRatio: 'landscape'
      },
      {
        id: '4-2',
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Server infrastructure',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '5',
    title: 'Incident Response Playbook',
    category: 'incident-response',
    year: '2023',
    slug: 'incident-response-playbook',
    coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Created comprehensive incident response playbooks for common security incidents including phishing, ransomware, and unauthorized access. Documented containment, eradication, and recovery procedures.',
    tools: 'Documentation, NIST Framework, MITRE ATT&CK',
    platform: 'GitHub Documentation',
    location: 'Personal Project',
    images: [
      {
        id: '5-1',
        src: 'https://images.unsplash.com/photo-504639725590-34d0984388bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Documentation and planning',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '6',
    title: 'TryHackMe SOC Path Completion',
    category: 'labs',
    year: '2024',
    slug: 'tryhackme-soc-path',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Completed the TryHackMe SOC Level 1 learning path, covering log analysis, SIEM fundamentals, threat intelligence, digital forensics, and incident response. Achieved top 5% ranking.',
    tools: 'TryHackMe Platform, Various Security Tools',
    platform: 'TryHackMe',
    location: 'Online Learning',
    images: [
      {
        id: '6-1',
        src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Cybersecurity learning',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '7',
    title: 'Threat Hunting with ELK Stack',
    category: 'threat-hunting',
    year: '2023',
    slug: 'elk-threat-hunting',
    coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Deployed Elasticsearch, Logstash, and Kibana stack for centralized log management. Created threat hunting queries and visualizations to proactively identify suspicious patterns.',
    tools: 'Elasticsearch, Logstash, Kibana, Beats',
    platform: 'Docker / Home Lab',
    location: 'Personal Project',
    images: [
      {
        id: '7-1',
        src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        alt: 'Programming and analysis',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '8',
    title: 'Python Security Automation',
    category: 'labs',
    year: '2023',
    slug: 'python-security-automation',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Developed Python scripts to automate common SOC tasks including IOC extraction, log parsing, API integrations with threat intelligence platforms, and automated reporting.',
    tools: 'Python, APIs, Regular Expressions, Pandas',
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
