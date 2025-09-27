begin;

insert into public.profiles (id, full_name, headline, bio, industry, stage, location, avatar_url, is_onboarded)
values
  ('00000000-0000-0000-0000-000000000001', 'Avery Chen', 'Building supply-chain AI at Seed', 'Former ops lead building predictive tooling for SMB importers. Looking for founders tackling logistics, AI infra, or climate.', 'AI / ML', 'Seed', 'San Francisco, CA', null, true),
  ('00000000-0000-0000-0000-000000000002', 'Diego Martínez', 'Marketplace for climate credits', 'Second-time founder building a marketplace to connect land stewards with buyers. Seeking fintech / climate founders for GTM swaps.', 'Climate', 'Pre-seed', 'Miami, FL', null, true),
  ('00000000-0000-0000-0000-000000000003', 'Priya Nair', 'Developer tooling for GenAI teams', 'Ex-Stripe engineer building a testing harness for LLM features. Interested in collaborating on AI workflows + fundraising prep.', 'Developer Tools', 'Seed', 'New York, NY', null, true),
  ('00000000-0000-0000-0000-000000000004', 'Maya Patel', 'Healthcare remote diagnostics', 'Clinical researcher launching remote diagnostics kits for cardiology. Looking for founders with telehealth + regulatory expertise.', 'Healthcare', 'MVP', 'Austin, TX', null, true);

commit;
