'use client';

import React from 'react';
import Image from 'next/image';

interface TechLogoProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

function getLogoFile(name: string): string {
  const n = name.toLowerCase().replace(/[\s\-_/&]/g, '');
  if (n.includes('python')) return 'python.svg';
  if (n.includes('numpy')) return 'numpy.svg';
  if (n.includes('pandas')) return 'pandas.svg';
  if (n.includes('matplotlib')) return 'matplotlib.svg';
  if (n.includes('mysql')) return 'mysql.svg';
  if (n.includes('scikit') || n.includes('sklearn')) return 'scikit-learn.svg';
  if (n.includes('chatgpt') || n.includes('openai') || n.includes('genai') || n.includes('generativeai')) return 'openai.svg';
  if (n.includes('pytorch')) return 'pytorch.svg';
  if (n.includes('tensorflow') || n.includes('keras')) return 'tensorflow.svg';
  if (n.includes('docker')) return 'docker.svg';
  if (n.includes('kubernetes') || n.includes('k8s') || n.includes('aks')) return 'kubernetes.svg';
  if (n.includes('azure') && !n.includes('devops')) return 'azure.svg';
  if (n.includes('azuredevops') || n.includes('devops')) return 'azure-devops.svg';
  if (n.includes('github')) return 'github.svg';
  if (n.includes('git')) return 'git.svg';
  if (n.includes('terraform')) return 'terraform.svg';
  if (n.includes('langchain') || n.includes('llamaindex') || n.includes('langgraph') || n.includes('crewai') || n.includes('autogen')) return 'langchain.svg';
  if (n.includes('fastapi')) return 'fastapi.svg';
  if (n.includes('streamlit')) return 'streamlit.svg';
  if (n.includes('flask')) return 'flask.svg';
  if (n.includes('sql') || n.includes('postgres') || n.includes('database') || n.includes('vector') || n.includes('chroma') || n.includes('pinecone')) return 'postgresql.svg';
  if (n.includes('powerbi') || n.includes('power-bi')) return 'powerbi.svg';
  if (n.includes('excel')) return 'excel.svg';
  if (n.includes('tableau')) return 'tableau.svg';
  if (n.includes('jira') || n.includes('agile') || n.includes('bpmn') || n.includes('flowchart')) return 'jira.svg';
  return 'python.svg';
}

export function TechLogo({ name, className = '', size = 'md' }: TechLogoProps) {
  const pixelSize = {
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
  }[size];

  const sizeClass = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }[size];

  const logoFile = getLogoFile(name);

  return (
    <div className={`relative ${sizeClass} flex items-center justify-center shrink-0`}>
      <Image
        src={`/logos/tools/${logoFile}`}
        alt={`${name} official logo`}
        width={pixelSize}
        height={pixelSize}
        className={`${sizeClass} ${className} object-contain`}
        unoptimized
      />
    </div>
  );
}
