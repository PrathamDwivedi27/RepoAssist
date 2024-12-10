import { api } from '@/trpc/react'
import React from 'react'
import {useLocalStorage} from "usehooks-ts"

const useProject = () => {
  const {data:projects}=api.project.getProjects.useQuery();
  const [projectId,setProjectId]=useLocalStorage('repoassist-projectId',"");        //local storage mein save karna hai ki konsa project abhi selected hai 
  const project=projects?.find(project=>project.id===projectId);


  return {
    projects,
    project,
    projectId,
    setProjectId
   }
}

export default useProject;