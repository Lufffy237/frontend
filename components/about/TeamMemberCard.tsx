'use client';

import { motion } from 'framer-motion';
import type { TeamMember } from '@/lib/team';

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="overflow-hidden rounded-lg bg-surface border border-border">
        {/* Photo */}
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Infos */}
        <div className="p-4 text-center bg-white">
          <h3 className="font-bold text-secondary text-sm mb-1">
            {member.name}
          </h3>
          <p className="text-xs text-primary font-semibold tracking-wide">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}