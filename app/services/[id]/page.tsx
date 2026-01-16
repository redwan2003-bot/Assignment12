import { SERVICES } from '@/lib/data';
import { notFound } from 'next/navigation';
import ServiceDetailsClient from '@/components/ServiceDetailsClient';

// Next.js 15 app directory dynamic route props
interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return {
      title: 'Service Not Found - Care.xyz',
    }
  }

  return {
    title: `${service.title} - Care.xyz`,
    description: service.description,
  }
}

export default async function ServiceDetailsPage({ params }: Props) {
  const { id } = await params;
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailsClient service={service} />;
}

