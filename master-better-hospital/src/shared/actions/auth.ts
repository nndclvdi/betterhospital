"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
import { SESSION_DETAIL } from '../constants/session';
import { SIGN_IN_PAGE } from '../constants/uri-fe-page';
 
export async function managerLogout() {
  const cookieStore = await cookies();
  
    cookieStore.delete(SESSION_DETAIL.MANAGER.name);
  redirect('/dashboard/login')
}

export async function patientLogout() {
  const cookieStore = await cookies();
  
    cookieStore.delete(SESSION_DETAIL.PATIENT.name);
    redirect(SIGN_IN_PAGE)
}