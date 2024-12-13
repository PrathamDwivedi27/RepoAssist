"use client"
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react';
import React from 'react'
import MeetingCard from '../meeting-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


const MeetingsPage = () => {
    const {projectId}=useProject();
    const {data:meetings,isLoading}=api.project.getMeetings.useQuery({projectId},{        //to check whether meeting has finished processing or not 
        refetchInterval:4000
    })
  return (
    <>
     <MeetingCard/>
     <div className='h-6'></div>
     <h1 className='text-xl font-semibold'>Meetings</h1> 
     {meetings && meetings.length===0 && <div>No meetings found</div>}
     {isLoading && <div>Loading...</div>}
     <ul className='divide-y divide-gray-200'>
        {meetings?.map(meeting=>(
            <li key={meeting.id} className='py-5 flex items-center justify-between gap-x-6'>
                <div>
                    <div className='min-w-0'>
                        <div className='flex items-center gap-2'>
                            <Link href={`/meetings/${meeting.id}`} className='text-sm font-semibold'>
                                {meeting.name}
                            </Link>
                            {meeting.status==="PROCESSING" && (
                                <Badge className='bg-yellow-500 text-white'>
                                    Processing...
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center text-xs text-gray-500 gap-x-2'>
                            <p className='whitespace-nowrap'>
                                {meeting.createdAt.toLocaleDateString()}
                            </p>
                            <p className='truncate'>
                                {meeting.issues.length} issues
                            </p>
                    </div>
                </div>
                <div className='flex items-center flex-none gap-x-4'>
                      <Link href={`/meetings/${meeting.id}`} >
                            <Button variant='outline'>
                                View Meeting
                            </Button>
                      </Link>      
                </div>
            </li>
        ))}
     </ul>
    </>
  )
}

export default MeetingsPage