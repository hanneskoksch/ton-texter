import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../types/supabase' 
import AccountForm from './account-form'

export default async function Dashboard() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <section>
        <AccountForm session={session} />
      </section>
    </div>
  )
}
