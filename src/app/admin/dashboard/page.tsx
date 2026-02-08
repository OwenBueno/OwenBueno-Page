'use server'; // This page can be a server component as it primarily displays info and calls server actions

import { redirect } from 'next/navigation';
import { getAdminSession, logout } from '@/app/admin/login/actions';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import styles from './AdminDashboardPage.module.css';

export default async function AdminDashboardPage() {
  const isAuthenticated = await getAdminSession();

  if (!isAuthenticated) {
    redirect('/admin/login'); // Should be caught by middleware, but good as a safeguard
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <form action={logout} className={styles.logoutForm}>
            <button 
              type="submit"
              className={styles.logoutButton}
            >
              Logout
            </button>
          </form>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Welcome, Admin!</h2>
          <p className={styles.sectionSubtitle}>
            This is your control panel. From here, you can manage your blog content.
          </p>
          <div className={styles.grid}>
            <Card className={styles.gridCard}>
              <h3 className={styles.gridCardTitle}>Manage Posts</h3>
              <p className={styles.gridCardText}>Create new posts or manage existing ones.</p>
              <Link 
                href="/admin/new-post"
                className={styles.gridCardButton}
              >
                Create New Post
              </Link>
            </Card>
            <Card className={styles.gridCard}>
              <h3 className={styles.gridCardTitle}>Manage Projects</h3>
              <p className={styles.gridCardText}>Add new projects to your portfolio.</p>
              <Link 
                href="/admin/new-project"
                className={styles.gridCardButton}
              >
                Create New Project
              </Link>
            </Card>
            {/* Add more admin sections/cards here as needed */}
          </div>
        </section>
      </div>
    </div>
  );
} 