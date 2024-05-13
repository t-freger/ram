---
sidebar_position: 80
---

# TrueNAS SCALE [Community]

:::note
This is a community contribution and not officially supported by the ram team, but included here for convenience.

**Please report issues to the corresponding [Github Repository](https://github.com/truenas/charts/tree/master/community/ram).**
:::

ram can easily be installed on TrueNAS SCALE via the **Community** train application.
Consider reviewing the TrueNAS [Apps tutorial](https://www.truenas.com/docs/scale/scaletutorials/apps/) if you have not previously configured applications on your system.

TrueNAS SCALE makes installing and updating ram easy, but you must use the ram web portal and mobile app to configure accounts and access libraries.

## First Steps

The ram app in TrueNAS SCALE installs, completes the initial configuration, then starts the ram web portal.
When updates become available, SCALE alerts and provides easy updates.

Before installing the ram app in SCALE, review the [Environment Variables](/docs/install/environment-variables.md) documentation to see if you want to configure any during installation.
You can configure environment variables at any time after deploying the application.

You can allow SCALE to create the datasets ram requires automatically during app installation.
Or before beginning app installation, [create the datasets](https://www.truenas.com/docs/scale/scaletutorials/storage/datasets/datasetsscale/) to use in the **Storage Configuration** section during installation.
ram requires seven datasets: **library**, **pgBackup**, **pgData**, **profile**, **thumbs**, **uploads**, and **video**.
You can organize these as one parent with seven child datasets, for example `mnt/tank/ram/library`, `mnt/tank/ram/pgBackup`, and so on.

:::info Permissions
The **pgData** dataset must be owned by the user `netdata` (UID 999) for postgres to start. The other datasets must be owned by the user `root` (UID 0) or a group that includes the user `root` (UID 0) for ram to have the necessary permissions.
:::

## Installing the ram Application

To install the **ram** application, go to **Apps**, click **Discover Apps**, either begin typing ram into the search field or scroll down to locate the **ram** application widget.

<img
src={require('./img/truenas01.png').default}
width="50%"
alt="ram App Widget"
className="border rounded-xl"
/>

Click on the widget to open the **ram** application details screen.

<img
src={require('./img/truenas02.png').default}
width="100%"
alt="ram App Details Screen"
className="border rounded-xl"
/>

Click **Install** to open the ram application configuration screen.

Application configuration settings are presented in several sections, each explained below.
To find specific fields click in the **Search Input Fields** search field, scroll down to a particular section or click on the section heading on the navigation area in the upper-right corner.

<img
src={require('./img/truenas03.png').default}
width="100%"
alt="Install ram Screen"
className="border rounded-xl"
/>

Accept the default values in **Application Name** and **Version**.

Accept the default value in **Timezone** or change to match your local timezone.
**Timezone** is only used by the ram `exiftool` microservice if it cannot be determined from the image metadata.

Accept the default port in **Web Port**.

ram requires seven storage datasets.
You can allow SCALE to create them for you, or use the dataset(s) created in [First Steps](#first-steps).
Select the storage options you want to use for **ram Uploads Storage**, **ram Library Storage**, **ram Thumbs Storage**, **ram Profile Storage**, **ram Video Storage**, **ram Postgres Data Storage**, **ram Postgres Backup Storage**.
Select **ixVolume (dataset created automatically by the system)** in **Type** to let SCALE create the dataset or select **Host Path** to use the existing datasets created on the system.

Accept the defaults in Resources or change the CPU and memory limits to suit your use case.

Click **Install**.
The system opens the **Installed Applications** screen with the ram app in the **Deploying** state.
When the installation completes it changes to **Running**.

<img
src={require('./img/truenas04.png').default}
width="100%"
alt="ram Installed"
className="border rounded-xl"
/>

Click **Web Portal** on the **Application Info** widget to open the ram web interface to set up your account and begin uploading photos.

:::tip
For more information on how to use the application once installed, please refer to the [Post Install](/docs/install/post-install.mdx) guide.
:::

## Editing Environment Variables

Go to the **Installed Applications** screen and select ram from the list of installed applications.
Click **Edit** on the **Application Info** widget to open the **Edit ram** screen.
The settings on the edit screen are the same as on the install screen.
You cannot edit **Storage Configuration** paths after the initial app install.

Click **Update** to save changes.
TrueNAS automatically updates, recreates, and redeploys the ram container with the updated environment variables.

## Updating the App

When updates become available, SCALE alerts and provides easy updates.
To update the app to the latest version, click **Update** on the **Application Info** widget from the **Installed Applications** screen.

Update opens an update window for the application that includes two selectable options, Images (to be updated) and Changelog. Click on the down arrow to see the options available for each.

Click **Upgrade** to begin the process and open a counter dialog that shows the upgrade progress. When complete, the update badge and buttons disappear and the application Update state on the Installed screen changes from Update Available to Up to date.

## Understanding ram Settings in TrueNAS SCALE

Accept the default value or enter a name in **Application Name** field.
In most cases use the default name, but if adding a second deployment of the application you must change this name.

Accept the default version number in **Version**.
When a new version becomes available, the application has an update badge.
The **Installed Applications** screen shows the option to update applications.

### ram Configuration Settings

You can accept the defaults in the **ram Configuration** settings, or enter the settings you want to use.

<img
src={require('./img/truenas05.png').default}
width="100%"
alt="Configuration Settings"
className="border rounded-xl"
/>

Accept the default setting in **Timezone** or change to match your local timezone.
**Timezone** is only used by the ram `exiftool` microservice if it cannot be determined from the image metadata.

You can enter a **Public Login Message** to display on the login page, or leave it blank.

### Networking Settings

Accept the default port numbers in **Web Port**.
The SCALE ram app listens on port **30041**.

Refer to the TrueNAS [default port list](https://www.truenas.com/docs/references/defaultports/) for a list of assigned port numbers.
To change the port numbers, enter a number within the range 9000-65535.

<img
src={require('./img/truenas06.png').default}
width="100%"
alt="Networking Settings"
className="border rounded-xl"
/>

### Storage Settings

You can install ram using the default setting **ixVolume (dataset created automatically by the system)** or use the host path option with datasets [created before installing the app](#first-steps).

<img
src={require('./img/truenas07.png').default}
width="100%"
alt="Configure Storage ixVolumes"
className="border rounded-xl"
/>

Select **Host Path (Path that already exists on the system)** to browse to and select the datasets.

<img
src={require('./img/truenas08.png').default}
width="100%"
alt="Configure Storage Host Paths"
className="border rounded-xl"
/>

### Resource Configuration Settings

Accept the default values in **Resources Configuration** or enter new CPU and memory values
By default, this application is limited to use no more than 4 CPU cores and 8 Gigabytes available memory. The application might use considerably less system resources.

<img
src={require('./img/truenas09.png').default}
width="100%"
alt="Resource Limits"
className="border rounded-xl"
/>

To customize the CPU and memory allocated to the container ram uses, enter new CPU values as a plain integer value followed by the suffix m (milli).
Default is 4000m.

Accept the default value 8Gi allocated memory or enter a new limit in bytes.
Enter a plain integer followed by the measurement suffix, for example 129M or 123Mi.

Systems with compatible GPU(s) display devices in **GPU Configuration**.
See [Managing GPUs](https://www.truenas.com/docs/scale/scaletutorials/systemsettings/advanced/managegpuscale/) for more information about allocating isolated GPU devices in TrueNAS SCALE.
