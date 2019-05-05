import React from 'react';
import {shallow,mount,render} from 'enzyme';
import App from 'src/App';
import Search from "src/search/Search";

describe('App tests', () => {
  const mockRepositoryToShow = {"id":10270250,"node_id":"MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==","name":"react","full_name":"facebook/react","private":false,"owner":{"login":"facebook","id":69631,"node_id":"MDEyOk9yZ2FuaXphdGlvbjY5NjMx","avatar_url":"https://avatars3.githubusercontent.com/u/69631?v=4","gravatar_id":"","url":"https://api.github.com/users/facebook","html_url":"https://github.com/facebook","followers_url":"https://api.github.com/users/facebook/followers","following_url":"https://api.github.com/users/facebook/following{/other_user}","gists_url":"https://api.github.com/users/facebook/gists{/gist_id}","starred_url":"https://api.github.com/users/facebook/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/facebook/subscriptions","organizations_url":"https://api.github.com/users/facebook/orgs","repos_url":"https://api.github.com/users/facebook/repos","events_url":"https://api.github.com/users/facebook/events{/privacy}","received_events_url":"https://api.github.com/users/facebook/received_events","type":"Organization","site_admin":false},"html_url":"https://github.com/facebook/react","description":"A declarative, efficient, and flexible JavaScript library for building user interfaces.","fork":false,"url":"https://api.github.com/repos/facebook/react","forks_url":"https://api.github.com/repos/facebook/react/forks","keys_url":"https://api.github.com/repos/facebook/react/keys{/key_id}","collaborators_url":"https://api.github.com/repos/facebook/react/collaborators{/collaborator}","teams_url":"https://api.github.com/repos/facebook/react/teams","hooks_url":"https://api.github.com/repos/facebook/react/hooks","issue_events_url":"https://api.github.com/repos/facebook/react/issues/events{/number}","events_url":"https://api.github.com/repos/facebook/react/events","assignees_url":"https://api.github.com/repos/facebook/react/assignees{/user}","branches_url":"https://api.github.com/repos/facebook/react/branches{/branch}","tags_url":"https://api.github.com/repos/facebook/react/tags","blobs_url":"https://api.github.com/repos/facebook/react/git/blobs{/sha}","git_tags_url":"https://api.github.com/repos/facebook/react/git/tags{/sha}","git_refs_url":"https://api.github.com/repos/facebook/react/git/refs{/sha}","trees_url":"https://api.github.com/repos/facebook/react/git/trees{/sha}","statuses_url":"https://api.github.com/repos/facebook/react/statuses/{sha}","languages_url":"https://api.github.com/repos/facebook/react/languages","stargazers_url":"https://api.github.com/repos/facebook/react/stargazers","contributors_url":"https://api.github.com/repos/facebook/react/contributors","subscribers_url":"https://api.github.com/repos/facebook/react/subscribers","subscription_url":"https://api.github.com/repos/facebook/react/subscription","commits_url":"https://api.github.com/repos/facebook/react/commits{/sha}","git_commits_url":"https://api.github.com/repos/facebook/react/git/commits{/sha}","comments_url":"https://api.github.com/repos/facebook/react/comments{/number}","issue_comment_url":"https://api.github.com/repos/facebook/react/issues/comments{/number}","contents_url":"https://api.github.com/repos/facebook/react/contents/{+path}","compare_url":"https://api.github.com/repos/facebook/react/compare/{base}...{head}","merges_url":"https://api.github.com/repos/facebook/react/merges","archive_url":"https://api.github.com/repos/facebook/react/{archive_format}{/ref}","downloads_url":"https://api.github.com/repos/facebook/react/downloads","issues_url":"https://api.github.com/repos/facebook/react/issues{/number}","pulls_url":"https://api.github.com/repos/facebook/react/pulls{/number}","milestones_url":"https://api.github.com/repos/facebook/react/milestones{/number}","notifications_url":"https://api.github.com/repos/facebook/react/notifications{?since,all,participating}","labels_url":"https://api.github.com/repos/facebook/react/labels{/name}","releases_url":"https://api.github.com/repos/facebook/react/releases{/id}","deployments_url":"https://api.github.com/repos/facebook/react/deployments","created_at":"2013-05-24T16:15:54Z","updated_at":"2019-05-05T17:33:13Z","pushed_at":"2019-05-05T16:47:42Z","git_url":"git://github.com/facebook/react.git","ssh_url":"git@github.com:facebook/react.git","clone_url":"https://github.com/facebook/react.git","svn_url":"https://github.com/facebook/react","homepage":"https://reactjs.org","size":141669,"stargazers_count":128392,"watchers_count":128392,"language":"JavaScript","has_issues":true,"has_projects":true,"has_downloads":true,"has_wiki":true,"has_pages":true,"forks_count":23527,"mirror_url":null,"archived":false,"disabled":false,"open_issues_count":655,"license":{"key":"mit","name":"MIT License","spdx_id":"MIT","url":"https://api.github.com/licenses/mit","node_id":"MDc6TGljZW5zZTEz"},"forks":23527,"open_issues":655,"watchers":128392,"default_branch":"master","score":155.86453};

  it('should shallow rendered without crashing', () => {
    const shallowWrapper = shallow(<App/>);
    expect(shallowWrapper).toBeDefined();
  });

  it('should mounted without crashing', () => {
    const mountedWrapper = mount(<App/>);
    expect(mountedWrapper).toBeDefined();
  });

  it('should shallow render common areas', () => {
    const shallowWrapper = shallow(<App/>);
    expect(shallowWrapper.find('.container')).toHaveLength(1);
    expect(shallowWrapper.find('h1').text()).toEqual('GitHub repositories search');
    expect(shallowWrapper.find('p').text()).toEqual('This is a sample app to demonstrate v3 GitHub api for searching repositories');
    expect(shallowWrapper.find('small').text()).toEqual('By Royee Shemesh');
  });

  it('should initiate the state with an empty repositoryToShow', () => {
    const mountedWrapper = mount(<App/>);
    expect(mountedWrapper.state()).toHaveProperty('repositoryToShow');
    expect(mountedWrapper.state('repositoryToShow')).toBe(null);
  });

  it('should initiate the state with an empty repositoryToShow', () => {
    const mountedWrapper = mount(<App/>);
    expect(mountedWrapper.find('input[placeholder="Search for a Github repository..."]')).toHaveLength(1);
  });

  it('should render summery when have repositoryToShow', () => {
    const mountedWrapper = mount(<App/>);

    mountedWrapper.setState({
      repositoryToShow: mockRepositoryToShow
    });

    expect(mountedWrapper.find('input[placeholder="Search for a Github repository..."]')).toHaveLength(0);

    expect(mountedWrapper.find('button')).toHaveLength(1);
    expect(mountedWrapper.find('h3')).toHaveLength(2);
  });

});
