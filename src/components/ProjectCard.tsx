"use client";

import { Project } from "@/data/portfolio";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{project.role}</p>
                </div>
                <div className="flex gap-2">
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label="GitHub Repo"
                        >
                            <Github size={20} />
                        </a>
                    )}
                    {project.links.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label="Live Demo"
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed">
                {project.problem}
            </p>

            <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    System Flow
                </div>
                <div className="flex items-center flex-wrap gap-2 text-sm text-slate-700 dark:text-slate-200 font-mono">
                    {project.systemFlow.split("->").map((step, index, arr) => (
                        <span key={index} className="flex items-center">
                            <span>{step.trim()}</span>
                            {index < arr.length - 1 && (
                                <ArrowRight size={14} className="mx-2 text-slate-300 dark:text-slate-600" />
                            )}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech) => (
                    <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-600"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};
